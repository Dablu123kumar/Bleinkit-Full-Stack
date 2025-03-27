import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/GlobleProvider";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../Utils/AxionToastError";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { FaMinus,FaPlus } from "react-icons/fa";


const AddToCartButton = ({ data }) => {
  const { fetchCartItem, increaseAndDecreaseQty, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty,setQty] = useState(0)
  const [cartItemDetails,setCartItemDetails] = useState()


  const handleADDTocart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryAPI.addToCart,
        data: {
          productId: data?._id,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        fetchCartItem();
        toast.success(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  /// checking this item in cart or not
  useEffect(() => {
    const checkingItem = cartItem.some(
      (item) => item.productId._id === data._id
    );
    setIsAvailableCart(checkingItem);
    const product = cartItem.find(item => item.productId._id === data._id)
    setQty(product?.quantity)
    setCartItemDetails(product)
    
  }, [data, cartItem]);

  const increaseQTY = async(e)=>{
     e.stopPropagation()
     e.preventDefault()
      const response = await increaseAndDecreaseQty(cartItemDetails?._id,qty+1)
      if(response.success){
        toast.success("item added")
      }

  }

  const decreaseQTY = async(e)=>{
    e.stopPropagation()
    e.preventDefault()
    if(qty > 1){
         const response = await increaseAndDecreaseQty(cartItemDetails?._id,qty-1)
         if(response.success){
          toast.success("item remove")
        }
  
    }
    else{
        deleteCartItem(cartItemDetails?._id)
    }
  }

  return (
    <div>
      {isAvailableCart ? (
        <div className=" flex items-center gap-1 lg:gap-2 text-xs lg:text-base">
          <button onClick={decreaseQTY} className=" bg-red-100 p-1 rounded-full hover:bg-red-300"><FaMinus /></button>
          <p className=" font-semibold">{qty} </p>
          <button onClick={increaseQTY} className=" bg-green-100 p-1 rounded-full hover:bg-green-300"><FaPlus /></button>
        </div>
      ) : (
        <button
          onClick={handleADDTocart}
          className=" bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
