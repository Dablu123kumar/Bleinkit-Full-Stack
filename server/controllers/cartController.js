import CartProductModel from "../models/cartProductModel.js";
import UserModel from "../models/userModel.js";

export const addToCartItem = async(req,res)=>{
    try {
        const userId = req.userId
        const {productId} = req.body 

        if(!productId){
            return res.status(400).json({
                message : "Please Provide ProductId",
                success :false,
                error : true
            })
        }

        const checkItemCart = await CartProductModel.findOne({
            userId : userId,
            productId : productId
        })
        if(checkItemCart){
            return res.status(400).json({
                message : "Product Already in cart"
            })
        }

        const cartItem = new CartProductModel({
            quantity : 1,
            userId : userId,
            productId : productId
        })
        const save = await cartItem.save()

        const updateCartUser = await UserModel.updateOne({_id : userId},{
            $push : {
                shopping_cart : productId
            }
        })

        return res.status(200).json({
            message : "Product Added to Cart",
            data : save,
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

// get cart item
export const getCartItem = async (req, res)=>{
    try {
        const userId = req.userId

        const cartItem = await CartProductModel.find({
            userId : userId 
        }).populate('productId')
        return res.status(200).json({
            message : "Product Added to Cart",
            data : cartItem,
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

// increase and decrease cart item quantity

export const updateCartItemQty = async(req,res)=>{
    try {
        const userId = req.userId
        const {_id,qty} = req.body
        if(!_id || !qty){
            return res.status(400).json({
                message : "please provide id and qty"
            })
        }
        const updateCartItem = await CartProductModel.updateOne({ _id : _id, userId : userId},{
            quantity : qty
        })
        return res.status(200).json({
            message : "Product Added",
            data : updateCartItem,
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

// delete cart item qty

export const deleteCartItemQty = async(req,res)=>{
    try {
        const userId = req.userId
        const {_id } = req.body
        if(!_id){
            return res.status(400).json({
                message : "please provide id "
            })
        }

        const deleteCartItem = await CartProductModel.deleteOne({_id : _id,userId : userId})
        return res.status(200).json({
            message : "Product Removed",
            data : deleteCartItem,
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