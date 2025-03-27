import React, { useEffect, useState } from "react";
import AxiosToastError from "../Utils/AxionToastError";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";


const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [adminSearch,setAdminSearch] = useState("")

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryAPI.getProduct,
        data: {
          page: page,
          limit: 10,
          search : adminSearch
        },
      });
      const { data: responseData } = response;
     // console.log("respondata", responseData);
      if (responseData.success) {
        setProductData(responseData.data);
        setTotalPageCount(responseData.totalNoPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [page]);

  // handle next button
  const handleNext = () => {
    if (page < totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };

  // handle preveous
  const handlePreveous = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  // handle admin search
  const handleOnchange = (e)=>{
      const {value} = e.target
      setAdminSearch(value)
      setPage(1)
  }
  useEffect(()=>{
    let flag = true
    const interval = setTimeout(()=>{
       if(flag){
        fetchProductData()
        flag = false
       }
    },300)
    return ()=>{
      clearTimeout(interval)
    }
  },[adminSearch])
  //console.log('search',adminSearch)
  return (
    <section className=" h-[73vh] ">
      <div className=" px-4 py-1 font-semibold bg-white shadow-md flex flex-col md:flex-row  items-start justify-between  sticky top-0 left-0 right-0 bottom-0">
          <h2>Products</h2>
          <div className="  flex items-center gap-2 border focus-within:border-primary-200 rounded bg-blue-50 px-2 py-1  ">
            <IoSearch size={25} className=" text-neutral-400" />
            <input type="text" placeholder="Search product here..." className="  font-normal outline-none bg-inherit " 
            value={adminSearch}
            onChange={handleOnchange}
            />
          </div>
      </div>
      {/* loadint component  */}
      <div>{loading && <Loading />}</div>
      {/* display product  */}
      <div className=" bg-blue-50 p-2">
        <div className="min-h-[calc(100vh-250px)]">
          <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2  ">
            {productData.map((p, index) => {
              return <ProductCardAdmin data={p} key={p + index + "indexno"} fetchProductData={fetchProductData} />;
            })}
          </div>
        </div>
        <div className=" flex items-center justify-between mt-1 ">
          <button
            disabled={page === 1}
            onClick={handlePreveous}
            className={`${
              page === 1
                ? "text-gray-200 bg-gray-400"
                : " text-black border-primary-200 hover:bg-primary-200"
            } border  p-1 font-extrabold rounded-full`}
          >
            <FaAngleLeft />{" "}
          </button>
          <p className=" w-full text-center text-gray-500 font-medium">
            {page}/{totalPageCount}{" "}
          </p>
          <button
            disabled={page === totalPageCount}
            onClick={handleNext}
            className={`${
              page === totalPageCount
                ? "text-gray-200 bg-gray-400"
                : "text-black border-primary-200 hover:bg-primary-200"
            } border p-1 font-extrabold  rounded-full`}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
