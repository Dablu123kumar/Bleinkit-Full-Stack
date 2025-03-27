import CategoryModel from "../models/categoryModel.js"
import SubCategoryModel from "../models/subCategoryModel.js"
import ProductModel from "../models/productModel.js"
export const AddCategory = async(req,res)=>{
    try {
        const {name,image} = req.body

        if(!name || !image){
            return res.status(400).json({
                message : "Please fill all fields",
                error : true,
                success : false
            })
        }

        const addCategory = new CategoryModel({name,image})
        
        const saveCategory = await addCategory.save()
        if(!saveCategory){
            return res.status(500).json({
                message : "Category not created",
                error : true,
                success : false
            })
        }
        return res.status(200).json({
            message : "Category added successfully",
            error : false,
            success : true,
            data : saveCategory
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        })
    }
}


// get categoty
export const getCategory = async(req,res)=>{
    try {
        const data = await CategoryModel.find().sort({createdAt : -1})
        return res.status(200).json({
            error : false,
            success : true,
            data : data
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        })
    }
}

// update category

export const updateCategory = async(req,res)=>{
    try {
        const {_id,name,image} = req.body

        const update = await CategoryModel.updateOne({
            _id : _id
        },{
            name : name,
            image : image
        })
        return res.status(200).json({
            message : "Category updated ",
            error : false,
            success : true,
            data : update
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        })
    }
}

// delete category

export const deleteCategory = async(req,res)=>{
    try {
        const {_id} = req.body
        const checkSubCategory = await  SubCategoryModel.find({
            category : {
                "$in" : [_id]
            }
        }).countDocuments()
        const checkProduct = await  ProductModel.find({
            category : {
                "$in" : [_id]
            }
        }).countDocuments()

        if(checkSubCategory > 0 || checkProduct > 0 ){
              return res.status(400).json({
                message : "Category already in used can't be deleted ",
                error : true,
                success : false,
               
            })
        }

        const deleteCategory  = await CategoryModel.deleteOne({_id : _id})
        return res.status(200).json({
            message : "Category deleted successfully ",
            error : false,
            success : true,
            data : deleteCategory
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        })
    }
}