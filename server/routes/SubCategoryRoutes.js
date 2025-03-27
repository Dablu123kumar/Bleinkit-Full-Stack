import {Router} from 'express'
import auth from "../middleware/auth.js";
import { AddSubCategory, deleteSubCategory, getSubCategory, updateSubCategory } from '../controllers/subCategoryController.js';


const subCategoryRouter = Router()

subCategoryRouter.post('/add-sub-category',auth,AddSubCategory)
subCategoryRouter.post('/get-sub-category',getSubCategory)
subCategoryRouter.put('/update-sub-category',auth,updateSubCategory)
subCategoryRouter.delete('/delete-sub-category',auth,deleteSubCategory)


export default subCategoryRouter