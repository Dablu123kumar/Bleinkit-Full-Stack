import ProductModel from "../models/productModel.js";

// create product
export const createProduct = async(req,res)=>{
    try {
        const {  
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
           }    = req.body 
           if(!name ||!image ||!category ||!subCategory ||!unit ||!stock ||!price ||!discount ||!description ) {
            return res.status(400).json({
                message : "Please Fill All Fields",
                error : true,
                success : false
            })
           }

           const product = new ProductModel({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
           })
           const saveProduct = await product.save()
           return res.status(200).json({
            message : "Product Created Successfully",
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

// get product 

export const getProduct = async(req,res)=>{
    try {
        let {page,limit,search} = req.body

        if(!page){
            page : 2
        }
        if(!limit){
            limit : 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } :{}
         
        const skip = (page -1) * limit

        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1}).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])
        return res.status(200).json({
            message : "Product Data",
            error : false,
            success : true,
            totalCount : totalCount,
            totalNoPage : Math.ceil(totalCount / limit),
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

// get product by category

export const getProductByCategory = async(req,res)=>{
    try {
        const {id} = req.body

        if(!id){
            return res.status(400).json({
                message : "Provide category id",
                error : true,
                success : false,
            })
        }

        const product = await ProductModel.find({
            category : {$in : id}
        }).limit(20)
        return res.status(200).json({
            message : "Category Product List",
            data : product,
            error : false,
            success : true,
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        })
    }
}


/// getProductByCategoryAndSubCategory
export const getProductByCategoryAndSubCategory = async(req,res)=>{
    try {
        let {categoryId,subCategoryId,page,limit} = req.body
        if(!categoryId || !subCategoryId){
            return res.status(400).json({
                message : "Provide category id and subCategory id",
                error : true,
                success : false,
            })
        }
        if(!page){
            page = 1
        }
        if(!limit){
            limit = 10
        }
        const  query = { 
            category : {$in : categoryId},
            subCategory : {$in : subCategoryId}
        }
        const skip = (page -1) * limit

        const [data,dataCount] =await Promise.all([
            ProductModel.find(query).sort({createdAt : -1}).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])
        return res.status(200).json({
            message : " Product List",
            data : data,
            totalCount : dataCount,
            page : page,
            limit : limit,
            error : false,
            success : true,
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        }) 
    }
}

// getProductDetails

export const getProductDetails = async(req,res)=>{
    try {
        const {productId} = req.body

        const product = await ProductModel.findOne({_id : productId})
        return res.status(200).json({
            message : " Product details",
            data : product,
            error : false,
            success : true,
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        }) 
    }
}

// updata product
export const updateProductDetails = async(req,res)=>{
  try {
    const {_id} = req.body
    if(!_id){
        return res.status(400).json({
            message : "Product id is required",
            error : true,
            success : false

        })
    }

    const updateProduct = await ProductModel.updateOne({_id : _id},{
        ...req.body
    })

    return res.status(200).json({
        message : " Updated successfully",
        data : updateProduct,
        error : false,
        success : true,
    })
  } catch (error) {
    return res.status(500).json({
        message : error.message ||error,
        error : true,
        success : false
    }) 
  }
}

// delete product 

export const deleteProduct = async(req,res)=>{
    try {
        const {_id} = req.body

        if(!_id){
            return res.status(400).json({
                message : "Product id is required",
                error : true,
                success : false
    
            })
        }

        const deletedProduct = await ProductModel.deleteOne({_id : _id})
        return res.status(200).json({
            message : " deleted successfully",
            data : deletedProduct,
            error : false,
            success : true,
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        })
    }
}

// search products
export const searchProducts = async(req,res)=>{
    try {
        let {search,page,limit} = req.body

        if(!page){
            page = 1
        }
        if(!limit){
            limit = 10
        }
        const query  = search ? {
            $text : {
                $search : search
            }
        } :{}

        const skip = (page - 1) * limit
        const [data,dataCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1}).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])
        return res.status(200).json({
            message : " data",
            data : data,
            totalCount : dataCount,
            page : page,
            limit : limit,
            totalPage : Math.ceil(dataCount/limit),
            error : false,
            success : true,
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message ||error,
            error : true,
            success : false
        })
    }
}