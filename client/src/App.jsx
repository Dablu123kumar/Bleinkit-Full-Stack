
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import  { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './Utils/GetUserDetails';
import { setUserDetails } from './store/UserSlice';
import { useDispatch } from 'react-redux';
import Axios from './Utils/Axios';
import SummaryAPI from './common/SummaryApi';
import AxiosToastError from './Utils/AxionToastError';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/ProductSlice';
import GlobalProvider from './provider/GlobleProvider';
import { IoCart } from "react-icons/io5";
import CartMobileLink from './components/CartMobile';


function App() {

  const dispatch = useDispatch()
  const location = useLocation()
  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    //console.log('USERDATA', userData.data)
    dispatch(setUserDetails(userData.data))
  }

   const fetchCategory = async () => {
      try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
          ...SummaryAPI.getCategory,
        });
        const { data: responseData } = response;
        if (responseData.success) {
          dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))))
          //setCategoryData(responseData.data);
        }
        //console.log(responseData);
      } catch (error) {
        AxiosToastError(error)
      } finally{
        dispatch(setLoadingCategory(false))
      }
    };
   const fetchSubCategory = async () => {
      try {
        const response = await Axios({
          ...SummaryAPI.getSubCategory,
        });
        const { data: responseData } = response;
        if (responseData.success) {
          dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))))
        }
        //console.log(responseData);
      } catch (error) {
        AxiosToastError(error)
      } 
    };

  useEffect(()=>{
    fetchUser()
    fetchCategory();
    fetchSubCategory();
    //fetchCartItem()
  },[])


  return (
    <GlobalProvider>
      <Toaster />
    <Header/>
     <main className=' min-h-[76vh] overflow-y-scroll scroll-bar '>
        <Outlet/>  
     </main>
     <Footer/>
     {
      location?.pathname !== '/checkout' && (
        <CartMobileLink/>
      )
     }
    </GlobalProvider>
  )
}

export default App
