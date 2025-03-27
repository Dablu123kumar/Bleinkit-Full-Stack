import React, { useState } from "react";
import { DisplayPriceInRupees } from "../Utils/DisplayPriceInRupies";
import { useGlobalContext } from "../provider/GlobleProvider";
import AddAddresses from "../components/AddAddresses";
import { useSelector } from "react-redux";
import AxiosToastError from "../Utils/AxionToastError";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate} from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js'

const CheckOutPage = () => {
  const { noDiscountTotalPrice, totalPrice, totalQty,fetchCartItem,fetchOrder } = useGlobalContext();
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const addressList = useSelector((state) => state.addresses.addressList);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const cartItemsList = useSelector((state)=>state.cartItem.cart)
  const navigate = useNavigate()
  //console.log("select", addressList[selectedAddress]);

  const handleCashOnDeliveryPayment = async()=>{
       try {
          const response = await Axios({
            ...SummaryAPI.cashOnDelivery,
            data : {
              list_items : cartItemsList ,
              totalQty : totalQty, 
              totalAmt : totalPrice,
              addressId : addressList[selectedAddress]?._id,
              subTotalAmt : totalPrice
            }
          })
          const {data : responseData} = response
          if(responseData.success){
            toast.success(responseData.message)
            if(fetchCartItem){
              fetchCartItem()
            }
            if(fetchOrder){
              fetchOrder()
            }
            navigate('/success',{
              state : {
                text : 'Order'
              }
            })
          }
       } catch (error) {
        AxiosToastError(error)
       }
  }

  const handleOnlinePayment =async()=>{
    try {
      toast.loading("loading...")
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
      const stripePromise = await loadStripe(stripePublicKey)
      const response = await Axios({
        ...SummaryAPI.payment_url_online,
        data :{
          list_items : cartItemsList ,
          totalAmt : totalPrice,
          addressId : addressList[selectedAddress]?._id,
          subTotalAmt : totalPrice
        }
      })
      const {data : responseData} = response

      stripePromise.redirectToCheckout({sessionId : responseData?.id})
      if(fetchCartItem){
        fetchCartItem()
      }
      if(fetchOrder){
        fetchOrder()
      }


    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className=" bg-blue-50 p-4">
      <div className=" container mx-auto p-4 flex lg:flex-row flex-col w-full gap-5 justify-between">
        <div className=" w-full lg:flex-1">
          {/* address  */}
          <h3 className="text-lg font-semibold">Choose address</h3>
          <div className=" p-2 grid gap-4 min-h-[60vh] max-h-[60vh] bg-white overflow-y-scroll">
            {addressList.map((address, index) => {
              return (
                <label htmlFor={"address" + index} className={!address.status && 'hidden'}>
                  <div
                    key={address + index + "addressIndex"}
                    className=" border rounded p-3 flex gap-3 hover:bg-blue-50  "
                  >
                    <div>
                      <input
                        type="radio"
                        id={"address" + index}
                        value={index}
                        name="address"
                        onChange={(e) => setSelectedAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <p>{address.address_line} </p>
                      <p>{address.city} </p>
                      <p>{address.state} </p>
                      <p>
                        {address.country} - {address.pincode}{" "}
                      </p>
                      <p>{address.mobile} </p>
                    </div>
                  </div>
                </label>
              );
            })}
            <div
              onClick={() => setOpenAddAddress(true)}
              className=" h-12 bg-blue-50 border-2 border-dotted flex justify-center items-center cursor-pointer"
            >
              Add Address
            </div>
          </div>
        </div>
        <div className=" w-full max-w-md  py-4 px-2">
          {/* summary */}
          <h3 className=" text-lg font-semibold">Summary</h3>
          <div className=" bg-white p-4">
            <h3 className=" font-semibold">Bill Details</h3>
            <div className=" flex gap-4 justify-between ml-1">
              <p> Items Price</p>
              <p className=" flex items-center gap-2 ">
                <span className=" line-through text-gray-500">
                  {DisplayPriceInRupees(noDiscountTotalPrice)}
                </span>{" "}
                <span>{DisplayPriceInRupees(totalPrice)} </span>
              </p>
            </div>
            <div className=" flex gap-4 justify-between ml-1">
              <p>Total Quantity</p>
              <p className=" flex items-center gap-2 ">{totalQty} item </p>
            </div>
            <div className=" flex gap-4 justify-between ml-1">
              <p>Delivery Charge</p>
              <p className=" flex items-center gap-2 text-green-600 ">Free </p>
            </div>
            <div className=" font-bold flex items-center justify-between gap-4">
              <p>Grand total</p>
              <p>{DisplayPriceInRupees(totalPrice)} </p>
            </div>
          </div>
          <div className=" w-full  flex flex-col gap-4 py-2">
            <button onClick={handleOnlinePayment} className=" py-2 px-4 bg-green-500 text-white font-semibold hover:bg-green-700 rounded">
              {" "}
              Online Payment
            </button>
            <button onClick={handleCashOnDeliveryPayment} className=" py-2 px-4 bg-green-500 text-white font-semibold hover:bg-green-700 rounded">
              {" "}
              Cash On Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddAddress && (
        <AddAddresses close={() => setOpenAddAddress(false)} />
      )}
    </section>
  );
};

export default CheckOutPage;
