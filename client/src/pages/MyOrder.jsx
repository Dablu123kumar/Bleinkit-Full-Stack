import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrder = () => {
  const orders  = useSelector((state)=>state.orders.order)

  console.log('orderitme',orders)
  return (
    <div>
      <div className=' bg-white shadow-md p-3 font-semibold'>
        <h1 >Order</h1>
      </div>
      {
        !orders[0] && (
          <NoData/>
        )
      }
      {
        orders.map((order,index)=>{
          return(
            <div key={order._id+index+'order'} className=' border rounded p-4 text-sm flex flex-col gap-3'>
              <p>Order no. : {order?.orderId} </p>
              <div className=' flex gap-3'>
                <img src={order?.product_details?.image[0]} alt="" className=' w-14 h-14' />
                <p className=' font-semibold'>{order?.product_details?.name} </p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default MyOrder