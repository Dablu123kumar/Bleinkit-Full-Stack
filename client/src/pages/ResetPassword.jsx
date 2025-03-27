import React, { useEffect, useState } from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import SummaryAPI from "../common/SummaryApi";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/AxionToastError";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data,setData] = useState({
        email : "",
        newPassword : "",
        confirmPassword : ""
    })

    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)

        const handleInput = (e)=>{
         const {name,value} = e.target

         setData((prev)=>{
              return{
                ...prev,
                [name] :value
              }
         })
    }

    useEffect(()=>{
      if(!(location?.state?.data?.success)){
        navigate('/')
      }

      if(location?.state?.email){
           setData((prev)=>{
            return{
                ...prev,
                email : location?.state?.email
            }
           })
      }
    },[])

        const handleSubmit = async(e)=>{
        e.preventDefault()
        if(data.newPassword.length < 8 || data.confirmPassword.length < 8){
            toast.error("Password must be at least 8 characters long")
            return;
        }
        else{
            try {
                const response = await Axios({
                    ...SummaryAPI.reset_password,
                       data  : data
                   })
                   if(response?.data?.success){
                    toast.success(response?.data?.message)
                    navigate('/login',{
                        state :data
                    })
                    setData({
                        email : "",
                        newPassword : "",
                        confirmPassword : ""
                    })
                   
                   }
                   else{
                    toast.error(response?.data?.message)
                   }
                   console.log('response',response.data)
            } catch (error) {
                AxiosToastError(error)
            }
        }
        
    }

    const validValue = Object.values(data).every(el => el)
    console.log('data',data)

    return (
        <section className="  container mx-auto w-full px-2 ">
          <div className=" bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
            <p className=" text-center font-semibold">Set New  Password</p>
            <form onSubmit={handleSubmit} className=" grid gap-4 py-5">
                
                <div className=" grid gap-1">
                    <label htmlFor="newPassword">New Password</label>
                    <div className=" bg-blue-50 p-2 rounded border flex items-center  focus-within:border-primary-200">
                    <input 
                     type={showPassword ? "text" : "password"} 
                    //  minLength={8 }
                    value={data.newPassword}
                    autoFocus
                    name="newPassword"
                    onChange={handleInput}
                    placeholder="Enter  New Password" 
                    className=" w-full bg-transparent outline-none" 
                    />
                     <div className=" cursor-pointer" onClick={()=> setShowPassword(!showPassword)}>
                    {
                        showPassword ?
                         ( <FaRegEye />) :
                         (<FaRegEyeSlash />)
                    }
                </div> 
                    </div>
                </div>
                <div className=" grid gap-1">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className=" bg-blue-50 p-2 rounded border flex items-center  focus-within:border-primary-200">
                    <input 
                     type={showConfirmPassword ? "text" : "password"} 
                    //  minLength={8}
                    value={data.confirmPassword}
                    name="confirmPassword"
                    onChange={handleInput}
                    placeholder="Enter  Confirm Password" 
                    className=" w-full bg-transparent outline-none" 
                    />
                     <div className=" cursor-pointer" onClick={()=> setShowConfirmPassword(!showConfirmPassword)}>
                    {
                        showConfirmPassword ?
                         ( <FaRegEye />) :
                         (<FaRegEyeSlash />)
                    }
                </div> 
                    </div>
                </div>
                <div className=" flex flex-col gap-2">
                    <button disabled = {!validValue} className={`${validValue ? "bg-green-800 hover:bg-green-700 " :"bg-gray-300" }  text-white py-2 rounded font-semibold w-full my-3 tracking-wide`}>Update Password</button>
                </div>
            </form>
           <p> Already have account ? <Link to={'/login'} className=" font-semibold text-green-700">Login here</Link></p>
          </div>
        </section>
      );
}

export default ResetPassword





// const ForgotPassword = () => {
//     const [data,setData] = useState({
//         email : "",
//     })
//     const navigate = useNavigate()

//     const handleInput = (e)=>{
//          const {name,value} = e.target

//          setData((prev)=>{
//               return{
//                 ...prev,
//                 [name] :value
//               }
//          })
//     }

//     const handleSubmit = async(e)=>{
//         e.preventDefault()
//         try {
//             const response = await Axios({
//                 ...SummaryAPI.forgot_password,
//                    data  : data
//                })
//                if(response?.data?.success){
//                 toast.success(response?.data?.message)
//                 navigate('/otp-verification',{
//                     state :data
//                 })
//                 setData({
//                     email : "",
//                 })
               
//                }
//                else{
//                 toast.error(response?.data?.message)
//                }
//                console.log('response',response.data)
//         } catch (error) {
//             AxiosToastError(error)
//         }
//     }

 
 
// };




