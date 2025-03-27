import React from "react";
import { DisplayPriceInRupees } from "../Utils/DisplayPriceInRupies";
import { Link } from "react-router-dom";
import validURLConvert from "../Utils/ValidURLConverter";
import { priceWithDiscount } from "../Utils/PriceWithDiscount";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const url = `/product/${validURLConvert(data.name)}-${data._id}`;
  const [loading,setLoading] = useState(false)
  

  return (
    <Link
      to={url}
      className="  border py-1 lg:p-4 grid gap-1 lg:gap-2 min-h-76 max-h-76 lg:min-h-[400px] lg:max-h-[400px]  max-w-36 min-w-36  lg:min-w-[196px]  lg:max-w-[196px] rounded shadow-md "
    >
      <div className=" min-h-24  w-full max-h-24 lg:max-h-48 lg:min-h-48  rounded overflow-hidden ">
        <img
          src={data?.image[0]}
          alt={data?.name}
          className=" w-full h-full object-scale-down lg:scale-110  "
        />
      </div>
      <div className=" flex flex-col gap-2">
        <div className=" flex justify-center items-center gap-2 lg:gap-4">
          <div className=" bg-green-50 text-secondary-200 rounded text-xs py-1 px-2 w-fit h-fit lg:mt-2 mx-1 ">
            10 min
          </div>
          <div>
            <span>
              {Boolean(data.discount) && (
                <p className=" text-green-600 bg-green-50 px-2 rounded text-xs w-fit h-fit py-1 lg:mt-2 mr-1 ">
                  {data?.discount} % discount{" "}
                </p>
              )}
            </span>
          </div>
        </div>
        <div className=" text-ellipsis text-sm lg:text-base line-clamp-2 font-medium px-2">
          {data?.name}{" "}
        </div>
        <div className=" w-fit h-fit px-2 text-sm lg:text-base">
          {data?.unit}{" "}
        </div>
      </div>
      <div>
        <div className=" px-1 lg:px-2 flex items-center justify-between gap-1 lg:gap-4">
          <div className=" font-medium lg:font-semibold ">
            {DisplayPriceInRupees(
              priceWithDiscount(data?.price, data?.discount)
            )}{" "}
          </div>
          <div className=" ">
           {
            data.stock ? (
              <AddToCartButton data={data} />
            )
            :
            <p className=" text-sm text-red-500 font-bold">Out of Stock</p>
           }
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
