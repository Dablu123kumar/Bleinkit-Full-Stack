import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../Utils/AxionToastError";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import LoadingCard from "./LoadingCard";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import validURLConvert from "../Utils/ValidURLConverter";
import { useSelector } from "react-redux";


const CategorywiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef()
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();
 // loading cart no.
 const loadingCartNumber = new Array(6).fill(null);

  const fetchCategorywiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryAPI.getProductByCategory,
        data: {
          id: id,
        },
      });
      const { data: responseData } = response;
      //console.log('responsdata',responseData)
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
    fetchCategorywiseProduct();
  },[]);
   //console.log('data',data)
   const handleScrollRight = ()=>{
    containerRef.current.scrollLeft += 200
   }
   const handleScrollLeft = ()=>{
    containerRef.current.scrollLeft -= 200
   }

  const handleRedirectProductListPage = () => {
    //console.log('catidname',name,id)
    const subCategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c?._id == id;
      });
      return filterData ? true : null;
    });
    const url = `/${validURLConvert(name)}-${id}/${validURLConvert(
      subCategory?.name
    )}-${subCategory?._id}`;
     return url
  };
  const redirectUrl = handleRedirectProductListPage()
  return (
    <section>
      <div>
        <div className=" container mx-auto p-4 flex items-center justify-between gap-4">
          <h3 className=" font-semibold text-lg md:text-xl">{name}</h3>
          <Link to={redirectUrl} className=" text-secondary-200 hover:text-green-400">
            {" "}
            See All
          </Link>
        </div>
        <div className=" flex items-center gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-scroll scroll-bar scroll-smooth" ref={containerRef}>
          {/* loading  */}
          {loading &&
            loadingCartNumber.map((_, index) => {
              return <LoadingCard key={_ + index + "loading"} />;
            })}
          {/* product  */}
          {data.map((p, index) => {
            return <CardProduct key={p._id + index + "product"} data={p} />;
          })}
          <div className=" w-full container mx-auto left-0 right-0 px-4 absolute hidden  md:flex justify-between">
            <button onClick={handleScrollLeft} className=" bg-white shadow-lg p-2 border border-primary-200 hover:bg-primary-200 rounded-full"><FaAngleLeft /></button>
            <button onClick={handleScrollRight} className=" bg-white shadow-lg p-2 border border-primary-200 hover:bg-primary-200 rounded-full"><FaAngleRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorywiseProductDisplay;
