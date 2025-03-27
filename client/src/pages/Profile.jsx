import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileImageUploadEdit from "../components/UserProfileImageUploadEdit";
import { useEffect } from "react";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../Utils/AxionToastError";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileImageEdit,setOpenProfileImageEdit] = useState(false)
  const [userData,setUserData] = useState({
    name: user.name,
    email:user.email,
    mobile: user.mobile
  })

  useEffect(()=>{
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || ""
    })
  },[user])

  const [loading,setLoading] = useState(false)

  const handleOnchange = (e)=>{
         const {name,value} = e.target
         setUserData((prev)=>{
          return{
            ...prev,
            [name]:value || ""
          }
         })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
          const response = await Axios({
            ...SummaryAPI.updateUser,
            data : userData
          })
          const {data : responseData } = response
          if(responseData.success){
            toast.success(responseData.message)
          }
          else{
            toast.success(response.data.message)
          }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }

  }


  return (
    <div className=" h-[calc(100vh-195px)] ">

      {/* profile upload and display image */}
      <div className=" w-16 h-16 bg-red-500 flex items-center justify-center rounded-full overflow-hidden">
        {user?.avatar ? (
          <img 
          src={user?.avatar}
           alt={user?.name}
           className=" w-full h-full"
            />
        ) : (
          <FaRegUserCircle size={60} />
        )}
      </div>
      <button type="button" onClick={()=>setOpenProfileImageEdit(!openProfileImageEdit)} className=" text-sm min-w-16 border border-primary-100 hover:border-primary-200 hover:bg-primary-100 px-3 py-1 rounded-full mt-4 font-medium">Change </button>
      {
        openProfileImageEdit && (
            <UserProfileImageUploadEdit close = {()=>setOpenProfileImageEdit(false)} />
        )
      }

      {/* name,mobile,email,change password */}
      <form className=" my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className=" grid">
          <label htmlFor="name">Name</label>
          <input
           type="text"
           placeholder="Enter your name"
           className=" px-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded py-1"
           value={userData?.name}
           name="name"
           onChange={handleOnchange}
           required
           />
        </div>
        <div className=" grid">
        <label htmlFor="email">Email</label>          <input
           type="email"
           placeholder="Enter your email"
           className=" px-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded py-1"
           value={userData?.email}
           name="email"
           onChange={handleOnchange}
           required
           />
        </div>
        <div className=" grid">
        <label htmlFor="mobile">Mobile No</label> 
          <input
           type="number"
           placeholder="Enter your mobile number"
           className=" px-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded py-1"
           value={userData?.mobile}
           name="mobile"
           onChange={handleOnchange}
           required
           />
        </div>
        <button className=" border border-primary-100 text-primary-100 hover:text-black px-4 py-2 font-semibold hover:bg-primary-100 rounded" >
          {
            loading ? "Loading" : 'Submit'
          }
          </button>
      </form>
     
    </div>
  );
};

export default Profile;
