import React from 'react'
import { IoClose } from 'react-icons/io5'

const AddMoreDetails = ({close,value,onchange,submit}) => {
  return (
    <section className=' fixed top-0 left-0 bottom-0 right-0 bg-neutral-900 bg-opacity-70 z-50 flex justify-center items-center p-4 '>
        <div className=' bg-white p-4 w-full max-w-md'>
            <div className=' flex items-center justify-between gap-3 rounded'>
                <h1 className=' font-semibold'>Add More Details</h1>
                <button onClick={close}><IoClose size={25}/></button>
            </div>
            <input 
            type="text"
             name=""  
             className=' bg-blue-50 p-2 outline-none borderb focus-within:border-primary-200 w-full my-2'
             placeholder='Enter more field name'
             value={value}
             onChange={onchange}
             />
             <button onClick={submit} className=' bg-primary-200 hover:bg-primary-100 px-4 py-2 rounded mx-auto w-fit block font-medium'>Add Field </button>
        </div>

    </section>
  )
}

export default AddMoreDetails