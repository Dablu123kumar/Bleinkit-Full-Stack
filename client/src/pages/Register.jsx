import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
 import toast from "react-hot-toast";
import SummaryAPI from "../common/SummaryApi";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/AxionToastError";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const [data,setData] = useState({
        name: "",
        email : "",
        mobile : "",
        password : "",
        confirmPassword : "",
    })

    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

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
        if(data?.password !== data?.confirmPassword){
           toast.error("Password and ConfirmPassword not matched!")
           return;
        }
      
        try {
            const response = await Axios({
                ...SummaryAPI.register,
                 data  : data
               })
               if(response?.data?.success){
                toast.success(response?.data?.message)
                setData({
                    name : "",
                    email : "",
                    mobile : "",
                    password : "",
                    confirmPassword : "",
                })
                navigate('/login')
               }
               else{
                toast.error(response?.data?.message)
               }
               //console.log('response',response.data)
        } catch (error) {
            AxiosToastError(error)
        }
    }
   // console.log('data',data)

    const validValue = Object.values(data).every(el => el)
  return (
    <section className="  container mx-auto h-[calc(100vh-145px)] w-full px-2 overflow-y-scroll scroll-bar ">
      <div className=" bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
        <p className=" text-center">Welcome To Blinkit</p>
        <form onSubmit={handleSubmit} className=" grid gap-4 mt-6">
            <div className=" grid gap-1">
                <label htmlFor="name">Name</label>
                <input type="text"
                value={data.name}
                name="name"
                onChange={handleInput} 
                autoFocus 
                placeholder="Enter your name" 
                className=" bg-blue-50 p-2 outline-none rounded border  focus:border-primary-200" 
                />
            </div>
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
            <div className=" grid gap-1">
                <label htmlFor="mobile">Mobile No</label>
                <input type="number" 
                value={data.mobile}
                name="mobile"
                onChange={handleInput}
                 
                placeholder="Enter your mobile no." 
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
            </div>
            <div className=" grid gap-1">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className=" bg-blue-50 p-2 rounded border flex items-center  focus-within:border-primary-200">
                <input
                 type={showConfirmPassword ? "text" : "password"}
                value={data.confirmPassword}
                name="confirmPassword"
                onChange={handleInput} 
                 
                placeholder="Enter your confirm Password" 
                className=" w-full bg-transparent outline-none " 
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
                <button disabled = {!validValue} className={`${validValue ? "bg-green-800 hover:bg-green-700 " :"bg-gray-300" }  text-white py-2 rounded font-semibold w-full my-3 tracking-wide`}>Register</button>
            </div>
        </form>
        <p>Already have account ? <Link to={'/login'} className=" font-semibold text-green-700">Login here</Link></p>
      </div>
    </section>
  );
};

export default Register;
