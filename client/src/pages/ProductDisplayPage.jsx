import React, { useEffect, useRef, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import AxiosToastError from "../Utils/AxionToastError";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { DisplayPriceInRupees } from "../Utils/DisplayPriceInRupies";
import Divider from "../components/Divider";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import { priceWithDiscount } from "../Utils/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryAPI.getProductDetails,
        data: {
          productId: productId,
        },
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
    fetchProductDetails();
  }, [params, productId]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };
  console.log("product data", data);

  return (
    <section className=" container mx-auto p-4 grid lg:grid-cols-2">
      <div className=" ">
        <div className=" h-full w-full lg:min-h-[65vh] lg:max-h-[65vh] max-h-56 min-h-56 rounded  bg-white">
          <img
            src={data.image[image]}
            alt={data.name}
            className=" h-full w-full object-scale-down"
          />
        </div>
        <div className=" flex items-center justify-center gap-2 my-1">
          {data.image.map((img, index) => {
            return (
              <div
                key={img + index + "imgname"}
                className={` bg-slate-300 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${
                  index === image && "bg-blue-300"
                }`}
              ></div>
            );
          })}
        </div>
        <div className=" grid relative ">
          <div
            ref={imageContainer}
            className=" flex gap-4 w-full overflow-x-auto scroll-bar relative z-10 "
          >
            {data.image.map((img, index) => {
              return (
                <div
                  key={img + index + "imginded"}
                  className=" h-20 w-20 min-h-20 min-w-20 shadow rounded cursor-pointer "
                >
                  <img
                    src={img}
                    alt="min-product"
                    className=" w-full h-full object-scale-down"
                    onClick={() => setImage(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className=" w-full h-full -ml-3 hidden lg:flex justify-between absolute ">
            <button
              onClick={handleScrollLeft}
              className=" z-10  p-1 rounded-full text-2xl relative"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className=" z-10  p-1 rounded-full text-2xl relative"
            >
              <FaAngleRight />
            </button>
          </div>
        </div> 
        {/* for desktop  */}
        <div className=" my-2 hidden lg:grid gap-3">
          <div>
            <p className=" font-medium">Description :</p>
            <p>{data.description} </p>
          </div>
          <div>
            <p>
              {" "}
              <span className=" font-medium"> Unit :</span> {data.unit}
            </p>
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className=" font-medium">{element} :</p>
                  <p>{data.more_details[element]} </p>
                </div>
              );
            })}
        </div>
      </div>

      <div className=" p-4 lg:pl-7 text-base lg:text-lg">
        <p className=" bg-green-300 w-fit rounded-full px-2">10 Min</p>
        <h2 className=" text-lg font-semibold lg:text-2xl">{data.name} </h2>
        <p> Unit : {data.unit} </p>
        <Divider />
        <div>
          <p> Price : </p>
          <div className=" flex items-center gap-2 lg:gap-4">
            <div className=" border border-green-600 px-2 py-1 rounded bg-green-50 w-fit">
              <p className=" font-semibold text-lg lg:text-xl">
                {DisplayPriceInRupees(
                  priceWithDiscount(data.price, data.discount)
                )}{" "}
              </p>
            </div>
            {data.discount && (
              <p className=" line-through">
                {DisplayPriceInRupees(data?.price)}{" "}
              </p>
            )}
            {data?.discount && (
              <p className=" font-semibold text-green-500 lg:text-2xl">
                {data?.discount}%{" "}
                <span className=" text-base text-neutral-500">Discount</span>{" "}
              </p>
            )}
          </div>
        </div>
        {data.stock === 0 ? (
          <p className=" text-red-500 text-lg my-2">Out of Stock</p>
        ) : (
           <div className=" my-3">
            <AddToCartButton data={data}/>
           </div>
          // <button className=" my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded">
          //   Add
          // </button>
        )}

        <h2 className="font-semibold">Why shop from blinkit?</h2>
        <div>
          <div className=" flex items-center gap-4 my-3">
            <img src={image1} alt="best prices" className=" w-16 h-16" />
            <div className=" text-sm">
              <div className=" font-semibold">Superfast Delivery,</div>
              <p>
                Get your order delivered to your doorstep at the earleast time
              </p>
            </div>
          </div>
          <div className=" flex items-center gap-4 my-3">
            <img src={image2} alt="best prices" className=" w-16 h-16" />
            <div className=" text-sm">
              <div className=" font-semibold">Best Prices & Offefs</div>
              <p>Best price desingnation with offers fron the manufacturars</p>
            </div>
          </div>
          <div className=" flex items-center gap-4 my-3">
            <img src={image3} alt="wide assortmet" className=" w-16 h-16" />
            <div className=" text-sm">
              <div className=" font-semibold">Wide Assortment</div>
              <p>
                Choose from 5000+ product for personal care ,household and other
                categories
              </p>
            </div>
          </div>
        </div>
        <div className=" my-2 grid  lg:hidden gap-3">
          <div>
            <p className=" font-medium">Description :</p>
            <p>{data.description} </p>
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className=" font-medium">{element} :</p>
                  <p>{data.more_details[element]} </p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
