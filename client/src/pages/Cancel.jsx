import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className=' m-2 w-full max-w-md bg-red-200 p-4 rounded mx-auto flex flex-col justify-center items-center gap-4'>
         <p className=' text-red-800 text-lg  py-5  font-bold'>Order Cancel </p>
         <Link to={'/'}  className=' border border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition-all px-4 py-1'>Go To Home</Link>
 
     </div>
  )
}

export default Cancel