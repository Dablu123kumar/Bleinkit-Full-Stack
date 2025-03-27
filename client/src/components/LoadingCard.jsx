import React from 'react'

const LoadingCard = () => {
  return (
    <div className='  border  lg:p-4 grid gap-1 lg:gap-2 min-h-76 max-h-76 lg:min-h-80 lg:max-h-80   min-w-32  lg:min-w-48  lg:max-w-48 rounded shadow-lg  animate-pulse'>
        <div className='min-h-24 bg-blue-100 rounded '></div>
        <div className=' p-2 lg:py-1 bg-blue-100 rounded w-20 '></div>
        <div className='p-2 lg:py-1 bg-blue-100 rounded  '></div>
        <div className='p-2 lg:p-1 bg-blue-100 rounded w-14  '></div>
        <div className=' flex items-center justify-between gap-2'>
        <div className='p-2 lg:p-2 bg-red-100 rounded w-20 '></div>
        <div className='p-2 lg:p-2 bg-red-100 rounded w-20 '></div>
        </div>
    </div>
  )
}

export default LoadingCard