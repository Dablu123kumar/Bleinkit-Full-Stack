import { Router } from "express";
import auth from "../middleware/auth.js";
import { addToCartItem, deleteCartItemQty, getCartItem, updateCartItemQty } from "../controllers/cartController.js";

const cartRouter = Router()

cartRouter.post('/create',auth,addToCartItem)
cartRouter.get('/get',auth,getCartItem)
cartRouter.put('/update_qty',auth,updateCartItemQty)
cartRouter.delete('/delete_cart_item',auth,deleteCartItemQty)

export default cartRouter