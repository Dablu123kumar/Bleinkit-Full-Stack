import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import uploadImage from "../Utils/UploadImage";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../Utils/AxionToastError";
import { setAllCategory } from "../store/ProductSlice";
import { useDispatch } from "react-redux";

const EditCategory = ({close,data : categoryData,fetchCategory }) => {
  const [data, setData] = useState({
    _id : categoryData._id,
    name: categoryData.name,
    image: categoryData.image,
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const handlechange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryAPI.updateCategory,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        if(fetchCategory){
          fetchCategory();
        }
        // dispatch(setAllCategory(responseData.data))
      
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImages = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setLoading(true)
    const Response = await uploadImage(file)
    const { data: ImageResponse } = Response;
    setLoading(false)
    if (ImageResponse && ImageResponse.data && ImageResponse.data.url) {
      setData((prev) => ({
        ...prev,
        image: ImageResponse.data.url,
      }));
    
    } else {
      throw new Error("Image upload response is invalid.");
    }
  };

  return (
    <section className=" fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-65 z-40 p-4 flex items-center justify-center">
      <div className=" bg-white w-full max-w-4xl p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className=" font-semibold">Category</h1>
          <button onClick={close} className=" w-fit block ml-auto">
            <IoCloseCircle size={25} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className=" grid gap-2 my-3">
          <div className=" grid gap-1">
            <label htmlFor="name" id="categoryName">
              Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="name"
              placeholder="Enter category name"
              value={data.name}
              onChange={handlechange}
              className=" outline-none bg-blue-50 px-4 py-2 border border-blue-200 focus-within:border-primary-200 rounded"
            />
          </div>
          <div className=" grid gap-1">
            <p>Image</p>
            <div className=" flex lg:flex-row gap-4 flex-col  items-center">
              <div className=" border bg-blue-50 h-36 w-full lg:w-36 rounded flex items-center justify-center">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="category"
                    className=" w-full h-full object-scale-down mix-blend-multiply"
                  />
                ) : (
                  <p className=" text-sm text-neutral-500">No image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={` 
              ${
                !data.name
                  ? "bg-gray-300 "
                  : "border-primary-200 hover:bg-primary-100"
              }
                  px-4 py-2 rounded border font-medium`}
                >
                    {
                        loading ? "Loading..." : "Upload Image"
                    }
                  
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImages}
                  type="file"
                  hidden
                  id="uploadCategoryImage"
                />
              </label>
            </div>
          </div>
          <button
            disabled={!data.name && !data.image}
            className={` 
              ${
                data.name && data.image
                  ? "border-primary-200 hover:bg-primary-100"
                  : "bg-gray-300 "
              }
                  px-4 py-2 rounded border font-medium`}
          >
            Update category
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
