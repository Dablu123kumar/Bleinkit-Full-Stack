import React from "react";
import { useGlobalContext } from "../provider/GlobleProvider";
import { IoCart } from "react-icons/io5";
import { DisplayPriceInRupees } from "../Utils/DisplayPriceInRupies";
import { Link } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  return (
    <>
      {cartItem[0] && (
        <div className="  sticky bottom-0 px-2  text-neutral-100 ">
          <div className="bg-green-600 px-2 py-1 rounded text-sm flex items-center justify-between gap-3 lg:hidden">
            <div className=" flex items-center gap-2">
              <div className=" bg-green-500 rounded w-fit p-1">
                <IoCart size={20} />
              </div>
              <div className=" text-xs">
                <p>{totalQty} items </p>
                <p>{DisplayPriceInRupees(totalPrice)} </p>
              </div>
            </div>
            <Link to={"/cart"} className=" flex items-center gap-1">
              <span className=" text-sm">View Cart </span>
              <FaCaretRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobileLink;
