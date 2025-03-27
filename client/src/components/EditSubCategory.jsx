import React, { useState } from "react";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import uploadImage from "../Utils/UploadImage";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../Utils/AxionToastError";
import { useSelector } from "react-redux";

const EditSubCategory = ({ close,data,fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    _id : data._id,
    name: data.name,
    image: data.image,
    category: data.category || [],
  });

  const allCategories = useSelector((state) => state.product.allCategory);

  const [loading, setLoading] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData((prev) => {
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
        ...SummaryAPI.EditSubCategory,
        data: subCategoryData,
      });
      const { data: responseData } = response;

      //console.log('subcategory',responseData)
      if (responseData.success) {
        toast.success(responseData.message);
        //fetchCategory();
        if(close){
          close();
        }
        if(fetchData){
            fetchData()
        }
       
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSubCategoryImages = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setLoading(true);
    const Response = await uploadImage(file);
    const { data: ImageResponse } = Response;
    setLoading(false);
    if (ImageResponse && ImageResponse.data && ImageResponse.data.url) {
      setSubCategoryData((prev) => ({
        ...prev,
        image: ImageResponse.data.url,
      }));
    } else {
      throw new Error("Image upload response is invalid.");
    }
  };

  const handleRemoveSelectedCategory = (categoryId) => {
    const index = subCategoryData.category.findIndex(
      (el) => el._id === categoryId
    );
    subCategoryData.category.splice(index, 1);
    setSubCategoryData((prev) => {
      return {
        ...prev,
      };
    });
  };
  return (
    <section className=" fixed top-10 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-65 z-50 p-4 flex items-center justify-center">
      <div className=" bg-white w-full max-w-4xl p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className=" font-semibold">Edit Sub Category</h1>
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
              id="name"
              name="name"
              placeholder="Enter Sub category name"
              value={subCategoryData.name}
              onChange={handlechange}
              className=" outline-none bg-blue-50 px-4 py-2 border border-blue-200 focus-within:border-primary-200 rounded"
            />
          </div>
          <div className=" grid gap-1">
            <p>Image</p>
            <div className=" flex lg:flex-row gap-4 flex-col  items-center">
              <div className=" border bg-blue-50 h-36 w-full lg:w-36 rounded flex items-center justify-center pt-1">
                {!subCategoryData.image ? (
                  <p className=" text-sm text-neutral-500">No image</p>
                ) : (
                  <img
                    src={subCategoryData.image}
                    alt="category"
                    className=" w-full h-full object-scale-down mix-blend-multiply"
                  />
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div
                  className={` 
                 ${
                   !subCategoryData.name
                     ? "bg-gray-300 "
                     : "border-primary-200 hover:bg-primary-100 text-primary-200  hover:text-black"
                 }
                     px-4 py-2 rounded border font-medium  `}
                >
                  {loading ? "Loading..." : " Upload Image"}
                </div>
                <input
                  disabled={!subCategoryData.name}
                  onChange={handleUploadSubCategoryImages}
                  type="file"
                  hidden
                  id="uploadSubCategoryImage"
                />
              </label>
            </div>
          </div>
          <div className=" grid gap-1">
            <label>Select Category</label>
            <div className=" border focus-within:border-primary-200 rounded outline-none">
              {/* display value  */}
              <div className=" flex flex-wrap gap-2">
                {subCategoryData.category.map((cat, index) => {
                  return (
                    <p
                      key={cat._id + "selectedvalue"}
                      className=" bg-white shadow-md px-1 m-1 flex gap-1"
                    >
                      {cat.name}
                      <div
                        className=" cursor-pointer hover:text-red-600"
                        onClick={() => handleRemoveSelectedCategory(cat._id)}
                      >
                        <IoClose size={20} />
                      </div>
                    </p>
                  );
                })}
              </div>
              {/* select category */}
              <select
                disabled={!subCategoryData.image && !subCategoryData.name}
                className={` 
                      ${
                        subCategoryData.name && subCategoryData.image
                          ? "border-primary-200"
                          : "bg-gray-300  "
                      }
                    w-full  bg-blue-50 border p-2 outline-none `}
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategories.find(
                    (el) => el._id == value
                  );
                  setSubCategoryData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    };
                  });
                }}
              >
                <option value={""} hidden>
                  Select Category
                </option>
                {allCategories.map((category, index) => {
                  return (
                    <option
                      value={category?._id}
                      key={category._id + "subcategory"}
                    >
                      {category?.name}{" "}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            disabled={!subCategoryData.image && !subCategoryData.name && subCategoryData.category[0]}
            className={` 
                 ${
                   subCategoryData.name &&
                   subCategoryData.image &&
                   subCategoryData.category
                     ? "border-primary-200 hover:bg-primary-100 text-primary-200 hover:text-black"
                     : "bg-gray-300  "
                 }
                     px-4 py-2 rounded border font-medium`}
          >
            Update Sub Category
          </button>
        </form>
      </div>
    </section>
  );
};


export default EditSubCategory