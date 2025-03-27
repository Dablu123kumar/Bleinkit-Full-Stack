import React, { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";
import ConfirmBox from "./ConfirmBox";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../Utils/AxionToastError";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import toast from "react-hot-toast";

const ProductCardAdmin = ({ data,fetchProductData }) => {
  const [editOpen,setEditOpen] = useState(false)
  const [deleteOpen,setDeleteOpen] = useState(false)
  const handleDelete = async()=>{
       try {
          const response = await Axios({
            ...SummaryAPI.deleteProduct,
            data : {
              _id : data._id
            }
          })
          const {data : responseData} = response
          if(responseData.success){
            toast.success(responseData.message)
            if(fetchProductData){
              fetchProductData()
            }
            setDeleteOpen(false)
          }
       } catch (error) {
        AxiosToastError(error)
       }
  }
  return (
    <section>
      <div className=" w-32 h-56  md:w-36 bg-white border shadow-md rounded p-2">
        <div className=" w-full h-28">
          <img
            src={data?.image[0]}
            alt={data?.name}
            className=" w-full h-full object-scale-down"
          />
        </div>
        <p className=" text-ellipsis line-clamp-1 font-medium">{data?.name} </p>
        <p className=" text-slate-400">{data?.unit} </p>
        <div className=" grid grid-cols-2 gap-3 py-2">
          <button onClick={()=>setEditOpen(true)} className=" border px-1 py-1 text-sm border-green-600 text-green-800 bg-green-100 hover:bg-green-200 rounded">
            {}
            Edit
          </button>
          <button onClick={()=>setDeleteOpen(true)} className=" border px-1 py-1 text-sm border-red-600 text-red-800 bg-red-100 hover:bg-red-200 rounded">
            Delete
          </button>
        </div>
      </div>
       {
        editOpen && (
          <EditProductAdmin data={data} fetchProductData={fetchProductData} close = {()=>setEditOpen(false)} />
        )
       }
       {deleteOpen && (
        <section className=" fixed top-0 bottom-0 left-0 right-0 bg-neutral-600 z-50 bg-opacity-70 p-4 flex justify-center items-center ">
          <div className=" bg-white p-4 w-full max-w-md rounded">
            <div className=" flex items-center justify-between gap-4">
              <h3 className=" font-semibold">Permanent Delete</h3>
              <button onClick={()=>setDeleteOpen(false)}><IoClose size={25}/> </button>
            </div>
            <p className=" my-2">Are you sure want to delete permanently ?</p>
            <div className=" flex justify-end gap-5 p-4">
              <button onClick={()=>setDeleteOpen(false)}  className=" border px-3 py-1 rounded border-red-600 text-red-800 hover:bg-red-200">Cancel</button>
              <button onClick={handleDelete} className=" border px-3 py-1 rounded border-green-600 text-green-800 hover:bg-green-200">Delete</button>
            </div>
          </div>
        </section>
       )}
    </section>
  );
};

export default ProductCardAdmin;
