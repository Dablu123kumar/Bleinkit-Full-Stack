import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
    const location = useLocation()
    console.log('location',location)
  return (
    <div className=' m-2 w-full max-w-md bg-green-200 p-4 rounded mx-auto flex flex-col justify-center items-center gap-4'>
        <p className=' text-green-800 text-lg  py-5  font-bold'>{Boolean(location?.state?.text) ? location?.state?.text : "Payment"} Successfully </p>
        <Link to={'/'}  className=' border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1'>Go To Home</Link>

    </div>
  )
}

export default Success