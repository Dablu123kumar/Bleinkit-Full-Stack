import React from 'react'
import noDataImage from '../assets/imageno.webp'
const NoData = () => {
  return (
    <div className=' flex items-center justify-center flex-col p-4 gap-2 '>
        <img src={noDataImage} alt="No data"
        className=' w-72 h-72'
         />
         <p className=' text-neutral-500  font-medium '> No Data</p>
    </div>
  )
}

export default NoData