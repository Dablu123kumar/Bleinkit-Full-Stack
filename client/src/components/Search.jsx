import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const params = useLocation()
  const searchText = params.search.slice(3)

  useEffect(() => {
    const isSearch = location?.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);
  const redirectToSearchPage = () => {
    navigate("search");
  };

  const handleOnChange = (e)=>{
    const value = e.target.value
    const url = `/search?q=${value}`
    navigate(url)
    //console.log('valu',value)
  }
  return (
    <div className=" w-full min-w-[300px] lg:min-w-[420px] h-10 lg:h-12 rounded-lg  border overflow-hidden flex items-center  text-neutral-600 bg-slate-50 group  focus-within:border-primary-200  ">
      <div>
        {isMobile && isSearchPage ? (
          <Link to={'/'} className="  flex justify-center items-center h-full group-focus-within:text-primary-200 bg-white rounded-full p-1 mx-2 ">
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <button className=" flex justify-center items-center h-full p-3 group-focus-within:text-primary-200 ">
            <IoSearch size={22} />
          </button>
        )}
      </div>
      <div
        onClick={redirectToSearchPage}
        className=" flex items-center  w-full h-full"
      >
        {!isSearchPage ? (
          // not on search page
          <div>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Search  milk ",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Search  bread",
                1000,
                "Search  suger ",
                1000,
                "Search  paneer ",
                1000,
                "Search  chocolate ",
                1000,
                "Search  curd ",
                1000,
                "Search  rice ",
                1000,
                "Search  egg ",
                1000,
                "Search  chips ",
                1000,
                "Search  sweets ",
                1000,
                "Search  oil ",
                1000,
                "Search  floor ",
                1000,
              ]}
              wrapper="span"
              speed={10}
              repeat={Infinity}
            />
          </div>
        ) : (
          // when i was on search page
          <div className=" w-full">
            <input
              type="text"
              placeholder="Search for products"
              autoFocus
              defaultValue={searchText}
              className=" bg-transparent w-full outline-none"
              onChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
