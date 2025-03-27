import React, { useEffect } from "react";
import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import validURLConvert from "../Utils/ValidURLConverter";
import { Link, useNavigate } from "react-router-dom";
import CategorywiseProductDisplay from "../components/CategorywiseProductDisplay";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListPage = (id, catName) => {
    //console.log('catidname',name,id)
    const subCategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });
      return filterData ? true : null;
    });

    const url = `/${validURLConvert(catName)}-${id}/${validURLConvert(
      subCategory?.name
    )}-${subCategory?._id}`;
    navigate(url);
    //console.log(url);
  };



  return (
    <section className=" bg-white">
      <div className="   container mx-auto rounded my-4 ">
        <div
          className={` w-full h-full min-h-48  rounded ${
            !banner && " animate-pulse bg-blue-100"
          } `}
        >
          <img src={banner} alt="" className=" hidden lg:block" />
          <img src={bannerMobile} alt="" className="  lg:hidden" />
        </div>
      </div>
      {/* category  */}
      <div className=" container mx-auto px-4 py-2 grid grid-cols-5 md:grid-cols-10  gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((c, index) => {
              return (
                <div
                  key={c + index + "loadingcat"}
                  className=" bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                >
                  <div className=" bg-blue-100 min-h-24 rounded"></div>
                  <div className=" bg-blue-100 h-8 rounded"></div>
                </div>
              );
            })
          : categoryData.map((cat, index) => {
              return (
                <div
                  key={cat + index + "loadingcat"}
                  className=" w-full h-full"
                  onClick={() =>
                    handleRedirectProductListPage(cat._id, cat.name)
                  }
                >
                  <div>
                    <img
                      src={cat?.image}
                      alt=""
                      className=" w-full h-full object-scale-down"
                    />
                  </div>
                </div>
              );
            })}
      </div>
      {/* display category product  */}
      <div className="">
        {categoryData.map((c, index) => {
          return (
            <CategorywiseProductDisplay
              id={c?._id}
              name={c?.name}
              key={c + index + "category"}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Home;
