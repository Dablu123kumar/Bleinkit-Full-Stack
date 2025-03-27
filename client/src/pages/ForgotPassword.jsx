import React, { useState } from "react";
 import toast from "react-hot-toast";
import SummaryAPI from "../common/SummaryApi";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/AxionToastError";
import { Link, useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const [data,setData] = useState({
        email : "",
    })
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
        try {
            const response = await Axios({
                ...SummaryAPI.forgot_password,
                   data  : data
               })
               if(response?.data?.success){
                toast.success(response?.data?.message)
                navigate('/otp-verification',{
                    state :data
                })
                setData({
                    email : "",
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

    const validValue = Object.values(data).every(el => el)
  return (
    <section className="  container mx-auto w-full px-2 ">
      <div className=" bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
        <p className=" text-center font-semibold">Forgot Password</p>
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
            <div className=" flex flex-col gap-2">
                <button disabled = {!validValue} className={`${validValue ? "bg-green-800 hover:bg-green-700 " :"bg-gray-300" }  text-white py-2 rounded font-semibold w-full my-3 tracking-wide`}>Send OTP</button>
            </div>
        </form>
       <p> Already have account ? <Link to={'/login'} className=" font-semibold text-green-700">Login here</Link></p>
      </div>
    </section>
  );
};

export default ForgotPassword;


