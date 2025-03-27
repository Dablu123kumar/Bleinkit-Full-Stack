import React from 'react'
import IsAdmin from '../Utils/IsAdmin';
import { useSelector } from 'react-redux';

const AdminPermission = ({children}) => {
    const user = useSelector((state) => state.user);
  return (
    <>
    {
        IsAdmin(user.role ) ? children : 
        (<p className=' text-red-600 bg-red-100 p-4'>Do not have access please visit to the admin </p>)
    }
    </>
  )
}

export default AdminPermission