import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import OTPVerification from "../pages/OTPVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermission from "../layout/AdminPermission";
import ProductList from "../pages/ProductList";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckOutPage from "../pages/CheckOutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "otp-verification",
        element: <OTPVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myorder",
            element: <MyOrder />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element: (
              <AdminPermission>
                {" "}
                <Category />
              </AdminPermission>
            ),
          },
          {
            path: "subcategory",
            element: (
              <AdminPermission>
                {" "}
                <SubCategory />
              </AdminPermission>
            ),
          },
          {
            path: "upload-products",
            element: (
              <AdminPermission>
                <UploadProduct />
              </AdminPermission>
            ),
          },
          {
            path: "products",
            element: (
              <AdminPermission>
                {" "}
                <ProductAdmin />
              </AdminPermission>
            ),
          },
        ],
      },
      {
        path :":category",
        children : [
          {
            path : ":subcategory",
            element : <ProductList/>
          }
        ]
      },
      {
        path : "product/:product",
        element : <ProductDisplayPage/>
      },
      {
        path : "cart",
        element : <CartMobile/>
      },
      {
        path : "checkout",
        element : <CheckOutPage/>
      },
      {
        path : "success",
        element : <Success/>
      },
      {
        path : "cancel",
        element : <Cancel/>
      },
    ],
  },
]);

export default router;
