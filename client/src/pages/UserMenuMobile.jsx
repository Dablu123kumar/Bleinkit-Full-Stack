import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoCloseCircle } from "react-icons/io5";


const UserMenuMobile = () => {
  return (
    <section className=' bg-white h-full w-full lg:hidden py-2'>
            <button onClick={()=>window.history.back()} className=' text-2xl text-neutral-800 block w-fit ml-auto px-2'> 
                <IoCloseCircle />
            </button>
        <div className=' container mx-auto px-3 pb-8'>
        <UserMenu/>
        </div>
    </section>
  )
}

export default UserMenuMobile