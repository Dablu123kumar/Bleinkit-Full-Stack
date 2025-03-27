 import axios from "axios";
 import SummaryAPI ,{ baseURL } from "../common/SummaryApi";


 const Axios = axios.create({
    baseURL: baseURL,
    withCredentials : true,
 })

 // sending accessToken in the header
 Axios.interceptors.request.use(async(config)=>{
   const accessToken = localStorage.getItem('accessToken')
      if(accessToken){
         config.headers.Authorization = `Bearer ${accessToken}`
     }
     return config
   },
   (error)=>{
     return Promise.reject(error)
 }
)


// extends the life span of accessToken with the help of refreshToken

Axios.interceptors.request.use(
   (response)=>{
      return response
   },
   async(error)=>{
      let originalRequest = error.config

      if(error.response.status === 401 && !originalRequest.retry){
           originalRequest.retry = true

           const refreshToken = localStorage.getItem('refreshToken')

           if(refreshToken){
            const newAccessToken = await refreshAccessToken(refreshToken)
            
            if(newAccessToken){
               originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
               return Axios(originalRequest)
            }
           }
      }

      return Promise.reject(error)
   }
)

const refreshAccessToken = async(refreshToken)=>{
   try {
      const response = await axios({
         ...SummaryAPI.refresh_token,
         headers: {
            Authorization : `Bearer ${refreshToken}`
         }
      })
      const accessToken = response.data.data.accessToken
      localStorage.setItem('accessToken',accessToken)
      return accessToken
      console.log('response',response)
   } catch (error) {
      console.log(error)
   }
}
 export default Axios