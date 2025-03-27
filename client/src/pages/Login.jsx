import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
 import toast from "react-hot-toast";
import SummaryAPI from "../common/SummaryApi";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/AxionToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../Utils/GetUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/UserSlice";


const Login = () => {
    const [data,setData] = useState({
        email : "",
        password : "",
    })

    const [showPassword,setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleInput = (e)=>{
         const {name,value} = e.target
         setData((prev)=>{
              return{
                ...prev,
                [name] :value
              }
         })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryAPI.login,
                 data  : data
               })
               if(response?.data?.success){
                toast.success(response?.data?.message)
                localStorage.setItem('accessToken',response?.data?.data?.accessToken)
                localStorage.setItem('refreshToken',response?.data?.data?.refreshToken)
                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))
                setData({ 
                    email : "",
                    password : "",
                })
                navigate('/')
               }
               else{
                toast.error(response?.data?.message)
               }
              //  console.log('response',response.data)
        } catch (error) {
            AxiosToastError(error)
        }
    }


    const validValue = Object.values(data).every(el => el)
  return (
    <section className="  container mx-auto w-full px-2 ">
      <div className=" bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
        <p className=" text-center font-semibold">Login</p>
        <form onSubmit={handleSubmit} className=" grid gap-4 py-5">
            
            <div className=" grid gap-1">
                <label htmlFor="email">Email</label>
                <input type="email" 
                value={data.email}
                name="email"
                onChange={handleInput}
                 
                placeholder="Enter your email" 
                className=" bg-blue-50 p-2 outline-none rounded border focus:border-primary-200" 
                />
            </div>
            <div className=" grid gap-1 ">
                <label htmlFor="password">Password</label>
                <div className=" bg-blue-50 p-2 rounded border flex items-center  focus-within:border-primary-200">
                <input 
                type={showPassword ? "text" : "password"}
                value={data.password}
                name="password"
                onChange={handleInput} 
                 
                placeholder="Enter your password" 
                className=" w-full bg-transparent outline-none " 
                />
                <div className=" cursor-pointer" onClick={()=> setShowPassword(!showPassword)}>
                    {
                        showPassword ?
                         ( <FaRegEye />) :
                         (<FaRegEyeSlash />)
                    }
                </div> 
                </div>
                <Link to={'/forgot-password'} className=" ml-auto text-primary-200 hover:text-red-600"> Forgot Password ? </Link>
            </div>
           
            <div className=" flex flex-col gap-2">
                <button disabled = {!validValue} className={`${validValue ? "bg-green-800 hover:bg-green-700 " :"bg-gray-300" }  text-white py-2 rounded font-semibold w-full my-3 tracking-wide`}>Login</button>
            </div>
        </form>
        <p>Don't have account ? <Link to={'/register'} className=" font-semibold text-green-700">Register here</Link></p>
      </div>
    </section>
  );
};

export default Login;
