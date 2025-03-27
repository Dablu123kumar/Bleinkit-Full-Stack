import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import { handleAddItemCart } from "../store/CartProduct";
import { useDispatch, useSelector } from "react-redux";
import AxiosToastError from "../Utils/AxionToastError";
import toast from "react-hot-toast";
import { priceWithDiscount } from "../Utils/PriceWithDiscount";
import { handleAddAddress } from "../store/AddressSlice";
import { setOrder } from "../store/OrderSlice";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch()
    const cartItem = useSelector((state)=>state?.cartItem.cart)
    const user = useSelector((state)=>state.user)
    const [totalPrice,setTotalPrice] = useState(0)
    const [noDiscountTotalPrice,setNoDiscountTotalPrice] = useState(0)
    const [totalQty,setTotalQty] = useState(0)


  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryAPI.getCartItem,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
        console.log(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increaseAndDecreaseQty = async(id,qty)=>{
    try {
      const response = await Axios({
        ...SummaryAPI.updateCartItemQty,
        data : {
          _id : id,
          qty : qty
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        //toast.success(responseData.message)
        fetchCartItem()
        return responseData
      }
    } catch (error) {
      AxiosToastError(error)
      return error
    }
  }

  const deleteCartItem = async(cartId)=>{
    try {
      const response = await Axios({
        ...SummaryAPI.deleteCartItem,
        data : {
          _id : cartId
        }
      })
      const {data : responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        fetchCartItem()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  
  const handleLogout = ()=>{
    localStorage.clear()
    dispatch(handleAddItemCart([]))
  }
  
  const fetchAddress = async()=>{
    try {
      const response = await Axios({
        ...SummaryAPI.getAddress
      })
      const {data : responseData} = response
      if(responseData.success){
        dispatch(handleAddAddress(responseData?.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const fetchOrder = async()=>{
    try {
      const response = await Axios({
        ...SummaryAPI.getOrderItems,
      
      })
      const {data : responseData} = response
      if(responseData.success){
        dispatch(setOrder(responseData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(()=>{
        fetchCartItem()
        handleLogout()
        fetchAddress()
        fetchOrder()
  },[user])

    useEffect(()=>{
       const qty = cartItem.reduce((prev,curr)=>{
        return prev + curr.quantity
       },0)
       setTotalQty(qty)
       
       const Tprice = cartItem.reduce((prev,curr)=>{
        return prev + (priceWithDiscount(curr.productId.price,curr.productId.discount) * curr.quantity)
       },0)
        setTotalPrice(Tprice)

        const noDiscountPrice = cartItem.reduce((prev,curr)=>{
          return prev + (curr.productId.price * curr.quantity)
         },0)
         setNoDiscountTotalPrice(noDiscountPrice)
    },[cartItem])




  return <GlobalContext.Provider value={{
    fetchCartItem,
    increaseAndDecreaseQty,
    deleteCartItem,
    fetchAddress,
    totalPrice,
    totalQty,
    noDiscountTotalPrice,
    fetchOrder
    }}>
    {children}
    </GlobalContext.Provider>;
};


export default GlobalProvider