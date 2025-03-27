import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector((state)=>state?.user)
   //console.log('userdasbboard from store',user)
  return (
     <section className=' bg-white'>
        <div className=' container mx-auto p-3 grid lg:grid-cols-[180px,1fr]  '>

             {/* left for menu */}
             <div className=' py-4 sticky hidden lg:block top-24 max-h-[calc(100vh-100px)]  overflow-y-scroll scroll-bar border-r'>
               <UserMenu/>
             </div>


            {/* right for content */}
            <div className=' bg-white min-h-[73vh] px-2 '>
                <Outlet/> 
            </div>

        </div>
     </section>
  )
}

export default Dashboard