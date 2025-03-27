
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../Utils/AxionToastError";
import { updateAvatar } from "../store/UserSlice";
import { IoCloseCircle } from "react-icons/io5";

const UserProfileImageUploadEdit = ({close}) => {
  const user = useSelector((state) => state.user);
  const [loading,setLoading]= useState(false)
  const dispatch = useDispatch()


  const handleUploadAvatar = async(e)=>{
    try {
    const file = e.target.files[0]
    if(!file){
        return;
    }

    const formData = new FormData()
    formData.append('avatar',file)
    setLoading(true)
    const response = await Axios({
        ...SummaryAPI.uploadAvtar,
        data : formData
    })
    const {data : responseData} = response
    dispatch(updateAvatar(responseData?.data?.avatar))
    //console.log('respk',response)
    if(response?.data?.success){
        toast.success(response.data.message)
    }
    else{
        toast.error(response.data.message)
    }
    } catch (error) {
        AxiosToastError(error)
    }
    finally{
        setLoading(false)
    }
  }

  return (
    <section className=" fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-75 p-4 flex items-center justify-center ">
      <div className=" bg-white max-w-sm w-full rounded-full p-4 flex flex-col items-center justify-center">
        <button  onClick={close} className=" ml-auto mr-12 text-2xl text-black">
          <IoCloseCircle />
          </button>
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
        <form onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor="uploadProfile">
            <div className=" text-sm min-w-16 border border-primary-100 hover:border-primary-200 hover:bg-primary-100 px-3 py-2 rounded-full mt-4 font-medium cursor-pointer">
              {
                loading ? 'Loading...' : 'Upload'
              }
            </div>
            <input onChange={handleUploadAvatar} type="file" id="uploadProfile" className=" hidden" />
          </label>
        </form>
      </div>
    </section>
  );
};

export default UserProfileImageUploadEdit;
