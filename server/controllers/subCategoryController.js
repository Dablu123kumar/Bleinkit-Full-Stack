
import SubCategoryModel from "../models/subCategoryModel.js";


// create sub category

export const AddSubCategory = async(req,res)=>{
    try {
        const {name,image,category} = req.body
        if(!name && !image && !category[0]){
            return res.status(400).json({
                message : "Please Provide all fields",
                error : true,
                success : false
            })
        }

        const payload ={name,image,category}

        const createSubCategory = new SubCategoryModel(payload)
        const save = await createSubCategory.save()
        return res.status(200).json({
            data:save,
            message : "Sub Category Added Successfully",
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        })
    }
}


// get sub category

export const getSubCategory = async(req,res)=>{
    try {
        const data  = await SubCategoryModel.find().sort({createdAt : -1}).populate('category')

        return res.status(200).json({
            data:data,
            message : "Sub Category",
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        })
    }
}

// update sub category

export const updateSubCategory = async(req,res)=>{
    try {
        const {_id,name,image,category} = req.body

        const checkSub = await SubCategoryModel.findById(_id)
        if(!checkSub){
            return res.status(400).json({
                data:data,
                message : " Category Not Found",
                error : true,
                success : false
            })
        }

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id,{
            name,image,category
        })
        return res.status(200).json({
            data:updateSubCategory,
            message : "Sub Category Updated Successfully",
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        })
    }
}

// delete sub category

export const deleteSubCategory = async(req,res)=>{
    try {
        const  { _id } = req.body

        const deleteSub = await SubCategoryModel.findByIdAndDelete(_id)
        return res.status(200).json({
            data:deleteSub,
            message : "Sub Category Deleted Successfully",
            error : false,
            success : true
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        })
    }
}