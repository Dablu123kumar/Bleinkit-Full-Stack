import React, { useEffect, useRef, useState } from "react";
 import toast from "react-hot-toast";
import SummaryAPI from "../common/SummaryApi";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/AxionToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";


const OTPVerification = () => {
    const [data,setData] = useState(["","","","","",""])
    const navigate = useNavigate()
    const inputRef= useRef([])
    const location = useLocation()
    console.log('location',location)

    useEffect(()=>{
         if(!location?.state?.email){
            navigate('/')
         }
    },[])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryAPI.verify_OTP,
                   data  : {
                    otp : data.join(""),
                    email : location?.state?.email
                   }
               })
               if(response?.data?.success){
                toast.success(response?.data?.message)
                setData(["","","","","",""])
                navigate('/reset-password',{
                    state : {
                        data : response.data,
                        email : location?.state?.email  
                    }             
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

    const validValue = data.every(el => el)
  return (
    <section className="  container mx-auto w-full px-2 ">
      <div className=" bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
        <p className=" text-center font-semibold">OTP Verification</p>
        <form onSubmit={handleSubmit} className=" grid gap-4 py-5">
            
            <div className=" grid gap-1">
                <label htmlFor="otp">Enter OTP</label>
                <div className=" flex items-center gap-2 justify-between mt-3">
                    {
                        data.map((el,index) => {
                            return (
                                <input 
                                key={'otp'+index}
                                type="text" 
                                autoFocus
                                ref={(ref)=>{
                                    inputRef.current[index] = ref
                                    return
                                }}
                                maxLength={1}
                                value={data[index]}
                                onChange={(e)=>{
                                    const value = e.target.value
                                    console.log('value',value)
                                    const newData= [...data]
                                    newData[index] = value
                                    setData(newData)

                                    if(value && index < 5){
                                        inputRef.current[index+1].focus()
                                    }
                                }}
                                className=" w-full max-w-14 bg-blue-50 p-2 outline-none rounded border focus:border-primary-200 text-center font-semibold" 
                                />
                            )
                        })
                    }
                </div>
              
            </div>
            <div className=" flex flex-col gap-2">
                <button disabled = {!validValue} className={`${validValue ? "bg-green-800 hover:bg-green-700 " :"bg-gray-300" }  text-white py-2 rounded font-semibold w-full my-3 tracking-wide`}>Verify OTP</button>
            </div>
        </form>
       <p> Already have account ? <Link to={'/login'} className=" font-semibold text-green-700">Login here</Link></p>
      </div>
    </section>
  );
};

export default OTPVerification;




