import AddressModel from "../models/addressModel.js";
import UserModel from "../models/userModel.js";


export const addAddresses = async(req,res)=>{
    try {
        const userId = req.userId
        const {address_line,city,state,pincode,country,mobile,status} = req.body 

        const createAddress = new AddressModel({
            address_line,city,state,pincode,country,mobile,userId:userId
        })
        const saveAddress = await createAddress.save()
        
        const addUserAddressId = await UserModel.findByIdAndUpdate(userId,{
            $push:{
                address_details : saveAddress._id
            }
        })
        return res.status(200).json({
            message : "address added successfuly",
            data : saveAddress,
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

// get address
export const getAddress = async(req,res)=>{
    try {
        const userId = req.userId    /// middleware auth

        const data = await AddressModel.find({userId : userId}).sort({createdAt : -1})
        return res.status(200).json({
            message : "address list",
            data : data,
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

// update address details

export const updateAddress = async(req,res)=>{
    try {
        const userId = req.userId    /// middleware auth
        const { _id , address_line,city,state,pincode,country,mobile} = req.body

        const updatedAddress = await AddressModel.updateOne({_id : _id,userId : userId},{
            address_line,
            city,
            state,
            country,
            mobile,
            pincode
        })
        return res.status(200).json({
            message : "address updated",
            data : updatedAddress,
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

/// delete address
export const deleteAddress = async(req,res)=>{
    try {
        const userId = req.userId    /// middleware auth
        const { _id } = req.body

        const disableAddress = await AddressModel.updateOne({_id : _id,userId : userId},{
            status : false
        })
        return res.status(200).json({
            message : "address remove",
            data : disableAddress,
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
