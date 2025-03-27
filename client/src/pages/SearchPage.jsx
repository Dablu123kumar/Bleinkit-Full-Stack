import React, { useEffect, useState } from 'react'
import LoadingCard from '../components/LoadingCard'
import AxiosToastError from '../Utils/AxionToastError'
import Axios from '../Utils/Axios'
import SummaryAPI from '../common/SummaryApi'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import noDataImage from '../assets/imageno.webp'
import logo from "../assets/logo.png"
import NoData from '../components/NoData'

const SearchPage = () => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  const loadintArrayCard = new Array(10).fill(null)
  const [page,setPage] = useState(1)
  const [totalPage,setTotalPage] = useState(1)
    const params  = useLocation()
    const searchText = params?.search?.slice(3)

  const fetchData = async()=>{
    try {
      setLoading(true)
      const respose = await Axios({
        ...SummaryAPI.searchProduct,
        data : {
          search : searchText,
          page : page
        }
      })
      const {data : responseData} = respose
      if(responseData.success){
        if(responseData.page == 1){
          setData(responseData.data)
        }
        else{
          setData((prev)=>{
            return [...prev,...responseData.data]
          })
        }
        setTotalPage(responseData.totalPage)
        //console.log(responseData)
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchData()
  },[page,searchText])

  const handleFetchMore = ()=>{
    if(totalPage > page){
      setPage(prev => prev + 1)
    }
  }
  return (
   <section className=' bg-white'>
    <div className=' container mx-auto p-4'>
      <p className=' font-semibold'> Search results: {data.length} </p>
      <InfiniteScroll 
      dataLength={data.length}
      hasMore={true}
      next={handleFetchMore}
      className='scroll-bar'
      >
      <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4'>
        {
          data.map((p,index)=>{
            return (
              <CardProduct data={p} key={p._id+"searchProdct"+index}/>
            )
          })
        }
        
        {/* loading data  */}
        {
          loading && (
            loadintArrayCard.map((_,index)=>{
              return(
                <LoadingCard key={'loadingsearchpage'+index}/>
              )
            })
          )
        }
      </div>
      </InfiniteScroll>
      {
          // no data 
          !data[0] && !loading && (
             <NoData/>
          )
        }
    </div>
   </section>
  )
}

export default SearchPage