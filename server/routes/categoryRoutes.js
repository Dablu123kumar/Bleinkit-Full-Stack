import { Router } from "express";
import auth from "../middleware/auth.js";
import {AddCategory, deleteCategory, getCategory, updateCategory} from "../controllers/categoryController.js";

const categoryRouter = Router()

categoryRouter.post('/add-category',auth,AddCategory)
categoryRouter.get('/get-category',auth,getCategory)
categoryRouter.put('/update-category',auth,updateCategory)
categoryRouter.delete('/delete-category',auth,deleteCategory)

export default categoryRouter