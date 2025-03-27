import React, { useEffect, useState } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import AxiosToastError from "../Utils/AxionToastError";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import validURLConvert from "../Utils/ValidURLConverter";
const ProductList = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);

  const AllSubCategory = useSelector((state) => state.product.allSubCategory);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);
  //console.log('params',AllSubCategory)
  const subcategory = params?.subcategory?.split("-");
  const subCategoryName = subcategory
    ?.slice(0, subcategory?.length - 1)
    ?.join(" ");
  //console.log(subCategoryName)
  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subcategory.split("-").slice(-1)[0];
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryAPI.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 12,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPageCount(responseData.totalCount);
      }
      //console.log('response data',responseData)
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [params]);

  useEffect(() => {
    const sub = AllSubCategory.filter((sub) => {
      const filteredData = sub.category.some((el) => {
        return el._id === categoryId;
      });
      return filteredData ? filteredData : false;
    });
    setDisplaySubCategory(sub);
    //console.log("sub", sub);
  }, [params, AllSubCategory]);
  return (
    <section className=" sticky top-24 lg:top-20">
      <div className=" container sticky top-24  mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[150px,1fr] h-full ">
        {/* sub category  */}
        <div className=" min-h-[77vh] max-h-[77vh] overflow-y-scroll scroll-bar lg:p-1 grid bg-white     ">
          {displaySubCategory.map((s, index) => {
            const link = `/${validURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${validURLConvert(
              s.name
            )}-${s._id}`;
            return (
              <Link to={link} key={s._id+index+"s._name"}
                className={` w-full lg:w-full lg:h-16 p-2  lg:flex  lg:items-center  lg:gap-2 border-b hover:bg-green-200  ${
                  subCategoryId === s._id ? "bg-green-200" : ""
                }`}
              >
                <div className=" w-fit max-w-28 bg-white  mx-auto lg:mx-0">
                  <img
                    src={s.image}
                    alt={s.name}
                    className=" w-14 h-full lg:h-14 lg:w-12 object-scale-down "
                  />
                </div>
                <p className=" lg:mt-0 text-xs lg:text-left text-center ">
                  {s.name}{" "}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Product  */}
        <div className="">
          <div className=" bg-white shadow-md p-4">
            <h1 className=" font-semibold ">{subCategoryName} </h1>
          </div>
          <div className=" min-h-[67vh] max-h-[67vh] overflow-y-scroll scroll-bar  ">
            <div className=" grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 p-4 gap-3">
              {data.map((p, index) => {
                return <CardProduct key={p._id + index + "product"} data={p} />;
              })}
            </div>

            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
