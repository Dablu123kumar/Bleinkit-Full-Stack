import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import AxiosToastError from "../Utils/AxionToastError";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import DisplayTable from "../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewFullImage from "../components/ViewFullImage";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import EditSubCategory from "../components/EditSubCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";


const SubCategory = () => {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  const [openEditSubCategory, setOpenEditSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageURL, setImageURL] = useState("");
  const [editSubCategoryData,setEditSubCategoryData] = useState({ _id : ""})
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteSubCategoryData, setDeleteSubCategoryData] = useState({ _id : "" });

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryAPI.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  // delete sub category

  const handleDeleteSubCategory = async() => {
    try {
      const response = await Axios({
        ...SummaryAPI.DeleteSubCategory,
        data : deleteSubCategoryData
      })
      const {data : responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        fetchSubCategory()
        setOpenConfirmBoxDelete(false)
        setDeleteSubCategoryData({_id : ""})
      }
      else{
        toast.error(responseData.message)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  };


  //console.log('suvdara',data)
  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        //console.log("row", row?.original);
        return (
          <div className=" flex items-center justify-center cursor-pointer">
            <img
              src={row?.original?.image}
              alt={row?.original?.name}
              className=" w-8 h-8"
              onClick={() => setImageURL(row?.original?.image)}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        //console.log("row", row?.original);
        return (
          <div className=" flex items-center justify-start cursor-pointer">
           {
            row?.original?.category?.map((c,index)=>{
              return <p key={c._id+"table"} className=" shadow-md px-1 inline-block ">{c?.name} </p>
            })
           }
          </div>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell : ({row})=>{
        return(
          <div className=" flex items-center justify-center gap-3">
            <button onClick={()=>{
              setOpenEditSubCategory(true)
              setEditSubCategoryData(row.original)
            }} className=" p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-600 hover:text-white"><MdOutlineEdit size={20} /></button>
            <button
             onClick={() => {
              setOpenConfirmBoxDelete(true);
              setDeleteSubCategoryData(row.original);
            }}
             className=" p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-600 hover:text-white "><MdOutlineDelete size={20} /></button>
          </div>
        )
      }
    }),
  ];

  return (
    <section>
      <div className=" px-4 py-1 font-semibold bg-white shadow-md flex items-center justify-between sticky top-0 left-0 right-0 bottom-0">
        <h2> Sub Category</h2>
        <button
          onClick={() => setOpenUploadSubCategory(true)}
          className=" text-sm border border-primary-200 text-primary-200 hover:text-black hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add Sub Category
        </button>
      </div>
{/* display table subcategory component */}
      <div className="   max-h-[calc(100vh-200px)]  overflow-scroll scroll-bar w-full max-w-[74vw] ">
        <DisplayTable data={data} column={column} />
      </div>
{/* upload subcategory component */}
      <div>
        {openUploadSubCategory && (
          <UploadSubCategoryModel
            close={() => setOpenUploadSubCategory(false)}
            fetchData={fetchSubCategory}
          />
        )}
      </div>
{/* full image component */}
      <div>
        {imageURL && (
          <ViewFullImage url={imageURL} close={() => setImageURL("")} />
        )}
      </div>
{/* update subcategory component */}
      <div>
        {
          openEditSubCategory && (
            <EditSubCategory 
            close={()=>setOpenEditSubCategory(false)} 
            data = {editSubCategoryData}
            fetchData={fetchSubCategory}
            />
          )
        }
      </div>
      {/* delete subcategory component */}
      <div>
        {
          openConfirmBoxDelete && (
            <ConfirmBox
            close={() => setOpenConfirmBoxDelete(false)}
            cancel={() => setOpenConfirmBoxDelete(false)}
            confirm={handleDeleteSubCategory}
            />
          )
        }
      </div>
    </section>
  );
};

export default SubCategory;
