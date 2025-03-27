import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAddresses from "../components/AddAddresses";
import { MdDelete, MdEdit } from "react-icons/md";
import EditAddressDetails from "../components/EditAddressDetails";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../Utils/AxionToastError";
import { useGlobalContext } from "../provider/GlobleProvider";


const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
   const [openAddAddress, setOpenAddAddress] = useState(false);
   const [openEdit,setOpenEdit] = useState(false)
   const [editData,setEditData] = useState({})
     const {fetchAddress} = useGlobalContext()

   const handleDisableAddress = async(id)=>{
    try {
      const response =await Axios({
        ...SummaryAPI.dissableAddress,
        data : {
          _id : id
        }
      })
      const {data : responseData } = response
      if(responseData.success){
        toast.success(responseData.message)
        fetchAddress()
      }
    } catch (error) {
      AxiosToastError(error)
    }
   }


  return (
    <div className=" ">
       <div className=" bg-white shadow-lg px-2 py-2 flex justify-between items-center">
        <h2 className=" font-semibold">Address</h2>
        <button onClick={()=> setOpenAddAddress(true)} className=" border border-primary-200 text-primary-200 px-2 py-1 rounded-full hover:bg-primary-200 hover:text-neutral-800 font-medium">Add Address</button>
       </div>
      <div className=" p-2 grid gap-4 min-h-[70vh] max-h-[70vh] bg-blue-50 overflow-y-scroll">
        {addressList.map((address, index) => {
          return (
            <div
              key={address + index + "addressIndex"}
              className={` border rounded p-3 flex justify-between  bg-white hover:bg-blue-50 ${!address.status && 'hidden'}  `}
            >
              <div>
                <p>{address.address_line} </p>
                <p>{address.city} </p>
                <p>{address.state} </p>
                <p>
                  {address.country} - {address.pincode}{" "}
                </p>
                <p>{address.mobile} </p>
              </div>
              <div className=" px-2 ">
                <button onClick={()=>{
                  handleDisableAddress(address?._id)
                }}   className=" bg-red-200 hover:bg-red-400 text-black p-1 rounded-full mr-4"><MdDelete  size={20}/></button>
                <button onClick={()=>{
                  setOpenEdit(true)
                  setEditData(address)
                }} className=" bg-green-200 hover:bg-green-400 text-black p-1 rounded-full"><MdEdit  size={20}/></button>
                </div>
              
            </div>
          );
        })}
        <div
          onClick={() => setOpenAddAddress(true)}
          className=" h-12 bg-blue-50 border-2 border-dotted flex justify-center items-center cursor-pointer"
        >
          Add Address
        </div>
      </div>
      {
        openAddAddress && (
          <AddAddresses close={()=>setOpenAddAddress(false)}/>
        )
      }
      {
        openEdit && (
          <EditAddressDetails close={()=>setOpenEdit(false)
          } data={editData}/>
        )
      }
    </div>
  );
};

export default Address;
