import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../Utils/UploadImage";
import Loading from "../components/Loading";
import ViewFullImage from "../components/ViewFullImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddMoreDetails from "../components/AddMoreDetails";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../Utils/AxionToastError";
import SuccessAlert from "../Utils/SucceAlert";

const EditProductAdmin = ({close,data:propsData,fetchProductData}) => {
  const [loading, setLoading] = useState(false);
  const [fullImageView, setFullImageView] = useState("");
  const [data, setData] = useState({
    _id : propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  });
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [openAddMoreDetails, setOpenAddMoreDetails] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  //console.log('allsub',allSubCategory)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadImgae = async (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    if (!file) {
      return;
    }
    setLoading(true);
    const Response = await uploadImage(file);
    const { data: ImageResponse } = Response;
    setLoading(false);

    if (ImageResponse && ImageResponse.data && ImageResponse.data.url) {
      setData((prev) => ({
        ...prev,
        image: [...prev.image, ImageResponse.data.url],
      }));
    } else {
      throw new Error("Image upload response is invalid.");
    }
  };

  // delete image

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return { ...prev };
    });
  };

  // select category
  const handleSelectCategory = (e) => {
    const value = e.target.value;
    const category = allCategory.find((el) => el._id === value);
    setData((prev) => {
      return {
        ...prev,
        category: [...prev.category, category],
      };
    });
    setSelectCategory("");
    //console.log('value',value)
  };

  //  select sub category
  const handleSelectSubCategory = (e) => {
    const value = e.target.value;
    const subCategory = allSubCategory.find((el) => el._id === value);
    setData((prev) => {
      return {
        ...prev,
        subCategory: [...prev.subCategory, subCategory],
      };
    });
    setSelectSubCategory("");
    // console.log('value',value)
  };

  // delete selected category
  const handleRemoveSelectedCategory = async (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };
  // delete selected sub category
  const handleRemoveSelectedSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  // handle submit more field details
  const handleAddFieldSubmit = (e) => {
    e.preventDefault();
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddMoreDetails(false);
  };

  // form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryAPI.updateProductDetails,
        data: data,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        SuccessAlert(responseData.message);
        if(close){
          close()
        }
        fetchProductData()
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className=" fixed top-0 bottom-0 left-0 right-0 bg-black z-50 bg-opacity-65 p-4">
      <div className=" bg-white w-full p-4 max-w-2xl mx-auto rounded ">
        <div className=" px-4 py-1 font-semibold bg-white shadow-md flex items-center justify-between sticky top-0 left-0 right-0 bottom-0">
          <h2>Update Product</h2>
          <button onClick={close} ><IoClose size={25}/></button>
        </div>
        <div className="grid p-4 h-full max-h-[calc(100vh-115px)] overflow-y-scroll scroll-bar ">
          <form className=" grid gap-3 " onSubmit={handleFormSubmit}>
            <div className=" grid gap-1">
              <label className=" font-medium" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Product Name"
                value={data.name}
                name="name"
                required
                onChange={handleChange}
                className=" bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
            </div>
            <div className=" grid gap-1">
              <label className=" font-medium" htmlFor="description">
                Description
              </label>
              <textarea
                type="text"
                placeholder="Enter Product Description"
                value={data.description}
                name="description"
                required
                onChange={handleChange}
                className=" bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
              />
            </div>
            <div>
              <p className=" font-medium">Image</p>
              <div>
                <label
                  htmlFor="productImage"
                  className=" bg-blue-50 h-20 border rounded flex items-center justify-center"
                >
                  <div className="flex items-center justify-center flex-col cursor-pointer ">
                    {loading ? (
                      <Loading />
                    ) : (
                      <>
                        <FaCloudUploadAlt size={40} />
                        <p>Upload Image </p>
                      </>
                    )}

                    <input
                      type="file"
                      name=""
                      id="productImage"
                      hidden
                      accept="image/*"
                      onChange={handleUploadImgae}
                    />
                  </div>
                </label>
                <div className=" mt-2 flex flex-wrap gap-4  ">
                  {/* display uploaded imgae */}
                  {data.image.map((imge, index) => {
                    return (
                      <div
                        key={index + "imge"}
                        className=" h-20 w-20 min-w-20 bg-blue-50 rounded py-1 relative group"
                      >
                        <img
                          src={imge}
                          alt={imge}
                          className=" w-full h-full object-scale-down cursor-pointer"
                          onClick={() => setFullImageView(imge)}
                        />
                        <div
                          onClick={() => handleDeleteImage(index)}
                          className=" absolute bottom-0 right-0 p-1 bg-red-100 text-red-700 hover:bg-red-600 hover:text-white rounded-full cursor-pointer hidden group-hover:block"
                        >
                          <MdDelete />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* category  */}
            <div>
              <label className=" font-medium" htmlFor="">
                Catgory
              </label>
              <div>
                <select
                  className=" bg-blue-50 w-full p-2 rounded outline-none text-gray-500"
                  name="category"
                  value={selectCategory}
                  onChange={handleSelectCategory}
                >
                  <option hidden>Select Category</option>
                  {allCategory.map((c, index) => {
                    return (
                      <option value={c._id} key={index + "c.name"}>
                        {c.name}{" "}
                      </option>
                    );
                  })}
                </select>
                <div className=" flex flex-wrap gap-2">
                  {data.category.map((c, index) => {
                    return (
                      <div
                        key={c._id + index + "c.name"}
                        className=" text-sm flex items-center gap-2 shadow my-2 border border-primary-200 px-1 bg-blue-50"
                      >
                        <p>{c.name} </p>
                        <div
                          onClick={() => handleRemoveSelectedCategory(index)}
                          className="hover:text-red-600 cursor-pointer"
                        >
                          <IoClose size={20} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* subCategory */}
            <div>
              <label className=" font-medium" htmlFor="">
                {" "}
                Sub Catgory
              </label>
              <div>
                <select
                  className=" bg-blue-50 w-full p-2 rounded outline-none text-gray-500"
                  name="category"
                  value={setSelectSubCategory}
                  onChange={handleSelectSubCategory}
                >
                  <option hidden>Select Sub Category</option>
                  {allSubCategory.map((c, index) => {
                    return (
                      <option value={c._id} key={index + "c.name"}>
                        {c.name}{" "}
                      </option>
                    );
                  })}
                </select>
                <div className=" flex flex-wrap gap-2">
                  {data.subCategory.map((c, index) => {
                    return (
                      <div
                        key={c._id + index + "c.name"}
                        className=" text-sm flex items-center gap-2 shadow my-2 border border-primary-200 px-1 bg-blue-50"
                      >
                        <p>{c.name} </p>
                        <div
                          onClick={() => handleRemoveSelectedSubCategory(index)}
                          className="hover:text-red-600 cursor-pointer"
                        >
                          <IoClose size={20} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* unit  */}
            <div className=" grid gap-1">
              <label className=" font-medium" htmlFor="unit">
                Unit
              </label>
              <input
                type="text"
                placeholder="Enter product unit"
                value={data.unit}
                name="unit"
                required
                onChange={handleChange}
                className=" bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
            </div>
            {/* stock  */}
            <div className=" grid gap-1">
              <label className=" font-medium" htmlFor="stock">
                No. of Stock
              </label>
              <input
                type="number"
                placeholder="Enter no. of  product unit"
                value={data.stock}
                name="stock"
                required
                onChange={handleChange}
                className=" bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
            </div>
            {/* price  */}
            <div className=" grid gap-1">
              <label className=" font-medium" htmlFor="price">
                Product Price
              </label>
              <input
                type="number"
                placeholder="Enter product price"
                value={data.price}
                name="price"
                required
                onChange={handleChange}
                className=" bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
            </div>
            {/* discount */}
            <div className=" grid gap-1">
              <label className=" font-medium" htmlFor="discount">
                Discount
              </label>
              <input
                type="number"
                placeholder="Enter product discount price"
                value={data.discount}
                name="discount"
                required
                onChange={handleChange}
                className=" bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
            </div>
            {/* more details  */}
            <div>
              {Object?.keys(data?.more_details)?.map((k, index) => {
                return (
                  <div className=" grid gap-1" key={index + k + "more_details"}>
                    <label className=" font-medium" htmlFor={k}>
                      {k}{" "}
                    </label>
                    <input
                      type="text"
                      placeholder={`Enter ${k}`}
                      value={data?.more_details[k]}
                      required
                      onChange={(e) => {
                        const value = e.target.value;
                        setData((prev) => {
                          return {
                            ...prev,
                            more_details: {
                              ...prev.more_details,
                              [k]: value,
                            },
                          };
                        });
                      }}
                      className=" bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                    />
                  </div>
                );
              })}
            </div>
            <div
              onClick={() => setOpenAddMoreDetails(true)}
              className=" hover:bg-primary-200 bg-white py-1 px-3 w-44 text-center font-semibold border border-primary-200 hover:text-black cursor-pointer rounded"
            >
              Add more details
            </div>
            <button className=" bg-primary-100 hover:bg-primary-200 font-bold rounded w-full py-1">
              Update Product
            </button>
          </form>
        </div>

        {/* add more field component  */}
        {openAddMoreDetails && (
          <AddMoreDetails
            close={() => setOpenAddMoreDetails(false)}
            onchange={(e) => setFieldName(e.target.value)}
            value={fieldName}
            submit={handleAddFieldSubmit}
          />
        )}

        {/* view full image component  */}
        <div>
          {fullImageView && (
            <ViewFullImage
              url={fullImageView}
              close={() => setFullImageView("")}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default EditProductAdmin;
