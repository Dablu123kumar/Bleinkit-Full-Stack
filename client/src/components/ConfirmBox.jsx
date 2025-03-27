import React from 'react'
import { IoCloseCircle } from 'react-icons/io5'

const ConfirmBox = ({cancel,confirm,close}) => {
  return (
    <div className=' fixed top-0 bottom-0 left-0 right-0 z-50  bg-neutral-800 bg-opacity-75 p-4 flex justify-center items-center'>
        <div className=' bg-white w-full max-w-md p-4 rounded'>
            <div className=' flex items-center justify-between'>
              <h1 className=' font-semibold'>Confirm to permanent delete</h1>
              <button onClick={close} className=" w-fit block ml-auto">
                    <IoCloseCircle size={25} />
              </button>
            </div>
            <p className=' my-4 '>Are you sure for permanent delete ? </p>
            <div className=' w-fit ml-auto flex items-center gap-3'>
              <button onClick={cancel} className=' px-4 py-1 border border-red-500 text-red-700 hover:bg-red-600 hover:text-white font-medium rounded'>Cancel</button>
              <button onClick={confirm} className=' px-4 py-1 border  border-green-500 text-green-700 hover:bg-green-600 hover:text-white font-medium rounded'>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmBox