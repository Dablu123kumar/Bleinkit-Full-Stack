import mongoose from "mongoose";
import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import CartProductModel from "../models/cartProductModel.js";
import Stripe from "../config/stripe.js";

export const CashOnDeliveryPayment = async (req, res) => {
  try {
    const userId = req.userId; /// auth middleware
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;
    //console.log('listitems' , list_items)

    const payload = list_items.map((el) => {
      return {
        userId: userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: el.productId._id,
        product_details: {
          name: el?.productId?.name,
          image: el?.productId?.image,
        },
        paymentId: "",
        payment_status: "CASH ON DELIVERY",
        delivery_address: addressId,
        subTotalAmt: subTotalAmt,
        totalAmt: totalAmt,
      };
    });

    const generateOrder = await OrderModel.insertMany(payload);

    /// remove from the cart
    const removeCartItems = await CartProductModel.deleteMany({
      userId: userId,
    });
    const updateInUser = await UserModel.updateOne(
      { _id: userId },
      { shopping_cart: [] }
    );
    return res.status(200).json({
      message: "Order placed successfully",
      success: true,
      data: generateOrder,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

/// discount price
export const priceWithDiscount = (price, dis = 1) => {
  const discountAmount = Math.ceil((Number(price) * Number(dis)) / 100);
  const actualPrice = Number(price) - Number(discountAmount);
  return actualPrice;
};

// online payment

export const OnlinePayment = async (req, res) => {
  try {
    const userId = req.userId; /// auth middleware
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

    const user = await UserModel.findById(userId);

    const line_items = list_items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item?.productId?.name,
            images: item?.productId?.image,
            metadata: {
              productId: item?.productId?._id,
            },
          },
          unit_amount:
            priceWithDiscount(
              item?.productId?.price,
              item?.productId?.discount
            ) * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user?.email,
      metadata: {
        userId: userId,
        addressId: addressId,
      },
      line_items: line_items,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };
    const session = await Stripe.checkout.sessions.create(params);

    return res.status(200).json(session);
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};


// webhook stripe

const getOrderProductItems = async({lineItems,userId,addressId,paymentId,payment_status})=>{
    const productList = []

    if(lineItems?.data?.length){
        for(const items of lineItems.data){
            const product = await Stripe.products.retrieve(items?.price?.product)
            //console.log('product',items)
            const payload = {
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: product.metadata.productId,
                product_details: {
                  name: product.name,
                  image: product.image,
                },
                paymentId: paymentId,
                payment_status: payment_status,
                delivery_address: addressId,
                subTotalAmt: Number(items.amount_subtotal /100),
                totalAmt: Number(items.amount_total / 100),
            }
            productList.push(payload)
        }
    }
    return productList
}

export async function webhookStripe(req, res) {
   const event = req.body;
   const endPointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

//console.log("event", event);
  // // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
 
        const lineItems = await Stripe?.checkout?.sessions.listLineItems(session?.id);
        //console.log("Line Items:", lineItems);
  
    //console.log("Session ID:", session?.id);
       const userId = session.metadata.userId
      const orderProduct = await getOrderProductItems({
        lineItems : lineItems,
        userId :  userId,
        addressId : session.metadata.addressId,
        paymentId : session.payment_intent,
        payment_status : session.payment_status

    })
      // console.log('orderproduct',orderProduct)
      const order = await OrderModel.insertMany(orderProduct)
      console.log(order)
      if(Boolean(order[0])){
        const removeCartItems = await UserModel.findByIdAndUpdate(userId,{
            shopping_cart : []
        })
        const removeCartProductDB = await CartProductModel.deleteMany({userId : userId})
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};


export const getOrderDetails = async(req,res)=>{
  try {
    const userId = req.userId    // order id

    const orderList = await OrderModel.find({userId : userId}).sort({createdAt : -1}).populate('delivery_address')

    return res.status(200).json({
      message : 'order list',
      data : orderList,
      success : true,
      error : false
    })
  } catch (error) {
    return res.status(500).json({
      message : error.message || error,
      success : false,
      error : true
    })
  }
}

