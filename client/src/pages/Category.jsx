import React, { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import AxiosToastError from "../Utils/AxionToastError";

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategoryData, setDeleteCategoryData] = useState({ _id: "" });
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });

  // const allCategory = useSelector(state => state.product.allCategory)

  // useEffect(()=>{
  //   setCategoryData(allCategory)
  // },[allCategory])

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryAPI.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
      //console.log(responseData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryAPI.deleteCategory,
        data : deleteCategoryData
      })

      const {data : responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        fetchCategory()
        setOpenConfirmBoxDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  };
  return (
    <section>
      <div className=" px-4 py-1 font-semibold bg-white shadow-md flex items-center justify-between sticky top-0 left-0 right-0 bottom-0">
        <h2>Category</h2>
        <button
          onClick={() => setOpenUploadCategory(!openUploadCategory)}
          className=" text-sm border border-primary-200 text-primary-200 hover:text-black hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}

      <div className=" p-4 grid grid-cols-2 md:grid-cols-4 gap-10 lg:grid-cols-5 max-h-[calc(100vh-198px)] overflow-y-scroll scroll-bar   ">
        {categoryData.map((category, index) => {
          return (
            <div
              className=" w-32 h-56  rounded shadow-md object-scale-down  "
              key={"category" + index}
            >
              <img
                src={category.image}
                alt={category.name}
                className=" w-full object-scale-down"
              />
              <div className=" flex items-center justify-center gap-2 px-1 mt-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className=" flex-1 bg-green-200 text-green-800 hover:bg-green-400 hover:text-green-950 rounded font-medium "
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true);
                    setDeleteCategoryData(category);
                  }}
                  className=" flex-1 bg-red-200 text-red-800 hover:bg-red-400 hover:text-red-950 rounded font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel
          fetchCategory={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      <div>
        {openEdit && (
          <EditCategory
            fetchCategory={fetchCategory}
            data={editData}
            close={() => setOpenEdit(false)}
            
          />
        )}
      </div>
      <div>
        {openConfirmBoxDelete && (
          <ConfirmBox
            close={() => setOpenConfirmBoxDelete(false)}
            cancel={() => setOpenConfirmBoxDelete(false)}
            confirm={handleDeleteCategory}
          />
        )}
      </div>
    </section>
  );
};

export default Category;
