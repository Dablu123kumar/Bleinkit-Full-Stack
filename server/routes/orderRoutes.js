import {Router} from 'express'
import auth from '../middleware/auth.js'
import { CashOnDeliveryPayment, getOrderDetails, OnlinePayment, webhookStripe } from '../controllers/orderControler.js'

const orderRouter = Router()

orderRouter.post('/cash-on-delivery',auth,CashOnDeliveryPayment)
orderRouter.post('/checkout-online',auth,OnlinePayment)
orderRouter.post('/webhook',webhookStripe)
orderRouter.get('/order_list',auth, getOrderDetails)


export default orderRouter