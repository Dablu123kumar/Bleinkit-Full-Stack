import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import uploadImagesController from "../controllers/uploadImageController.js";
const uploadImagesRouter = Router()

uploadImagesRouter.post('/upload',auth,upload.single('image'),uploadImagesController)


export default uploadImagesRouter