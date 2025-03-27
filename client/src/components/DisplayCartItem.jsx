import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobleProvider";
import { DisplayPriceInRupees } from "../Utils/DisplayPriceInRupies";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { priceWithDiscount } from "../Utils/PriceWithDiscount";
import imageEmpty from "../assets/empty_cart.webp";

const DisplayCartItem = ({ close }) => {
  const { noDiscountTotalPrice, totalPrice,totalQty } = useGlobalContext();
  const Navigate = useNavigate()
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
const redirectToCheckOutPage = async()=>{
      if(user?._id){
        Navigate('/checkout')
        close()
        return
      }
}
  return (
    <section className=" bg-neutral-900 fixed top-0 bottom-0 left-0 right-0 bg-opacity-70 z-50">
      <div className=" bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className=" flex items-center justify-between gap-3 shadow-md p-3 font-semibold">
          <h2>Cart</h2>
          <Link to={"/"} className=" lg:hidden">
            <IoClose size={20} />
          </Link>
          <button onClick={close} className=" hidden lg:block">
            <IoClose size={20} />{" "}
          </button>
        </div>

        <div className=" h-full min-h-[82vh] lg:min-h-[84vh] lg:max-h-[84vh] max-h-[82vh]  bg-blue-50 p-2">
          {/* {Display items } */}
          {cartItem[0] ? (
            <>
              <div className=" flex items-center justify-between gap-3 py-2 px-4 bg-blue-100 text-blue-500 rounded-full">
                <p>Your Total Savings :- </p>
                <p>
                  {DisplayPriceInRupees(noDiscountTotalPrice - totalPrice)}{" "}
                </p>
              </div>
              <div className=" bg-white rounded-lg p-2 flex flex-col gap-4 overflow-scroll scroll-bar min-h-[50vh] max-h-[50vh]  my-1  ">
                {cartItem[0] &&
                  cartItem.map((item, index) => {
                    return (
                      <div
                        className=" w-full flex  gap-3"
                        key={item?._id + "indexno"}
                      >
                        <div className=" min-w-14 max-w-14 h-14  border rounded">
                          <img
                            src={item?.productId?.image[0]}
                            alt=""
                            className=" object-scale-down h-full w-full"
                          />
                        </div>
                        <div className=" w-full max-w-sm text-xs">
                          <p className=" text-ellipsis line-clamp-2">
                            {item?.productId?.name}{" "}
                          </p>
                          <p className=" text-neutral-400">
                            {" "}
                            unit : {item?.productId?.unit}{" "}
                          </p>
                          <p className=" font-semibold">
                            Price :{" "}
                            {DisplayPriceInRupees(
                              priceWithDiscount(
                                item?.productId?.price,
                                item?.productId?.discount
                              )
                            )}{" "}
                          </p>
                        </div>
                        <div>
                          <AddToCartButton data={item?.productId} />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className=" bg-white p-4">
                <h3 className=" font-semibold">Bill Details</h3>
                <div className=" flex gap-4 justify-between ml-1">
                  <p> Items Price</p>
                  <p className=" flex items-center gap-2 "><span className=" line-through text-gray-500">{DisplayPriceInRupees(noDiscountTotalPrice)}</span> <span>{DisplayPriceInRupees(totalPrice)} </span></p>
                </div>
                <div className=" flex gap-4 justify-between ml-1">
                  <p>Total Quantity</p>
                  <p className=" flex items-center gap-2 ">{totalQty} item </p>
                </div>
                <div className=" flex gap-4 justify-between ml-1">
                  <p>Delivery Charge</p>
                  <p className=" flex items-center gap-2 text-green-600 ">Free  </p>
                </div>
                <div className=" font-bold flex items-center justify-between gap-4">
                  <p >Grand total</p>
                  <p>{DisplayPriceInRupees(totalPrice)} </p>
                </div>

              </div>

             
            </>
          ) : (
            <div className=" flex flex-col items-center justify-center bg-white min-h-[81vh] ">
              <img
                src={imageEmpty}
                alt=""
                className=" w-full object-scale-down"
              />
              <Link to={'/'} onClick={close} className=" border py-1 px-4 rounded bg-green-400 hover:bg-green-700 hover:text-white font-semibold">Shop now</Link>
            </div>
          )}
          {
            cartItem[0] && (
              
              <div className=" p-2  sticky bottom-3 lg:bottom-0 ">
                <div className=" bg-green-700 text-neutral-100 p-2 rounded flex items-center justify-between gap-5 font-bold ">
                  <div>
                    {DisplayPriceInRupees(totalPrice)}
                  </div>
                  <button onClick={redirectToCheckOutPage} className=" flex items-center gap-1">
                    Proceed
                    <span>
                      <FaCaretRight />
                    </span>
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default DisplayCartItem;
