import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { DisplayPriceInRupees } from "../Utils/DisplayPriceInRupies";
import { useGlobalContext } from "../provider/GlobleProvider";
import DisplayCartItem from "./DisplayCartItem";


const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate()
  const isSearchPage = location.pathname === "/search";
  const user = useSelector((state)=>state?.user)
  // console.log('user from store',user)
  const handleMobileUser = ()=>{
    if(!user?._id){
      navigate('/login')
      return
    }
    navigate('/user')
  }

  const [openUserMenu,setOpenUserMenu] = useState(false)
  const cartItem = useSelector((state)=>state?.cartItem.cart)
  const { totalPrice,totalQty} = useGlobalContext()
  const [opetCartSection,setOpenCartSection] = useState(false)
  // const [totalPrice,setTotalPrice] = useState(0)
  // const [totalQty,setTotalQty] = useState(0)

  //console.log('cartitem',cartItem)

  // total quantity and price
  // useEffect(()=>{
  //    const qty = cartItem.reduce((prev,curr)=>{
  //     return prev + curr.quantity
  //    },0)
  //    setTotalQty(qty)
     
  //    const Tprice = cartItem.reduce((prev,curr)=>{
  //     return prev + (curr.productId.price * curr.quantity)
  //    },0)
  //     setTotalPrice(Tprice)
  // },[cartItem])

  return (
    <header className=" h-24 lg:h-20 flex flex-col  shadow-md sticky top-0 z-40 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className=" container mx-auto flex items-center h-full px-2 justify-between">
          {/* Logo */}
          <div className=" h-full overflow-hidden flex justify-start items-center rounded-full">
            <Link to={"/"}>
              <img
                src={logo}
                alt="logo"
                width={110}
                height={20}
                className=" hidden lg:block h-full object-scale-down mix-blend-multiply"
              />
              <img
                src={logo}
                alt="logo"
                width={90}
                height={10}
                className=" lg:hidden object-scale-down  "
              />
            </Link>
          </div>
          {/* search */}
          <div className=" hidden lg:block">
            <Search />
          </div>

          {/* login and my cart */}
          <div>
            {/* user icon display only mobile version */}
            <button className=" text-neutral-500 lg:hidden" onClick={handleMobileUser}>
              <FaRegUserCircle size={25} />
            </button>
            {/* display in desktop  */}
            <div className=" hidden lg:flex items-center gap-10">
              {
               user?._id ? (
                <div onClick={()=>setOpenUserMenu(!openUserMenu)} className=" relative">
                    <div className=" flex items-center gap-1 cursor-pointer select-none">
                      <p>Account</p>
                      {
                        openUserMenu ? (< GoTriangleUp  size={25}/>)
                        :
                        ( <GoTriangleDown size={25}/>)
                      }
                      
                     
                    </div>
                    {
                      openUserMenu && (
                    <div className=" absolute right-0 top-12">
                             <div className=" bg-white rounded p-4 min-w-36 lg:shadow-lg">
                            <UserMenu/>
                             </div>
                    </div>

                      )
                    }
                  </div>
               )
               : 
               (
                <Link to={'/login'} className=" text-lg  font-medium px-2">Login</Link>
               )
              }
             
              <button onClick={()=>setOpenCartSection(true)} className=" flex items-center gap-2 bg-green-800 hover:bg-green-700 px-2 py-1  rounded text-white text-sm">
                {/* add to cart icons */}
                <div className=" animate-bounce">
                <BsCart4  size={30}/>
                </div>
                 <div>
                  {
                    cartItem[0] ? (
                      <div>
                         <p>{totalQty}  Items</p>
                         <p>{DisplayPriceInRupees(totalPrice)}</p>
                      </div>
                    ):(
                      <p>My Cart</p>
                    )
                  }
                 </div>
              </button>
              </div>
          </div>
        </div>
      )}

      <div className="container mx-auto flex items-center h-full lg:hidden px-2">
        <Search />
      </div>
      {
        opetCartSection && (
          <DisplayCartItem close={()=>setOpenCartSection(false)}/>
        )
      }
    </header>
  );
};

export default Header;
