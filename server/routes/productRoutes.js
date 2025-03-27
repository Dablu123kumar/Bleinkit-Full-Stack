import {Router} from 'express'
import auth from '../middleware/auth.js'
import { createProduct, deleteProduct, getProduct, getProductByCategory, getProductByCategoryAndSubCategory, getProductDetails, searchProducts, updateProductDetails } from '../controllers/productController.js'
import { admin } from '../middleware/Admin.js'

const productRouter = Router()

productRouter.post('/create-product',auth,admin,createProduct)
productRouter.post('/get-product',getProduct)
productRouter.post('/get-product-by-category',getProductByCategory)
productRouter.post('/get-product-by-category&subcategory',getProductByCategoryAndSubCategory)
productRouter.post('/get-product-details',getProductDetails)
// update product
productRouter.put('/update-product-details',auth,admin,updateProductDetails)
//delete product
productRouter.delete('/delete-product',auth,admin,deleteProduct)
// search products
productRouter.post('/search-products',searchProducts)


export default productRouter