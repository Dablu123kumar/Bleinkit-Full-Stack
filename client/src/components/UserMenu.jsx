import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../Utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import { logout } from "../store/UserSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../Utils/AxionToastError";
import { RiExternalLinkLine } from "react-icons/ri";
import IsAdmin from "../Utils/IsAdmin";

const UserMenu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryAPI.logout,
      });
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div>
      {user && (
        <div className=" w-full">
          <div className=" font-semibold">My Account</div>
          <div className=" text-sm flex items-center gap-2 w-full">
            <span className=" max-w-32 text-ellipsis line-clamp-1 font-medium">
              {" "}
              {user?.name || user?.mobile}
            </span> <span className=" text-red-600 font-medium">{user.role === 'ADMIN' ? '(Admin)' : ""} </span>{" "}
            <Link to={"/dashboard/profile"} className=" hover:text-primary-200">
              <RiExternalLinkLine size={16} />
            </Link>{" "}
          </div>
          <Divider />
          <div className=" text-sm grid gap-2">
            {IsAdmin(user.role) && (
              <div className=" flex flex-col">
                <Link
                  to={"/dashboard/category"}
                  className=" px-2 hover:bg-orange-200 py-1"
                >
                  Category
                </Link>
                <Link
                  to={"/dashboard/subcategory"}
                  className=" px-2 hover:bg-orange-200 py-1"
                >
                  Sub Category
                </Link>
                <Link
                  to={"/dashboard/upload-products"}
                  className=" px-2 hover:bg-orange-200 py-1"
                >
                  Upload Product
                </Link>
                <Link
                  to={"/dashboard/products"}
                  className=" px-2 hover:bg-orange-200 py-1"
                >
                  Products
                </Link>
              </div>
            )}

            <Link
              to={"/dashboard/myorder"}
              className=" px-2 hover:bg-orange-200 py-1"
            >
              My Orders
            </Link>
            <Link
              to={"/dashboard/address"}
              className=" px-2 hover:bg-orange-200 py-1"
            >
              My Address
            </Link>
            <button
              onClick={handleLogout}
              className=" text-left hover:bg-orange-200 py-1"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
