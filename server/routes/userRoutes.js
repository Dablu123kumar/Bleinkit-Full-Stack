import {Router} from 'express'
import { forgotPassword, login, logout, refreshToken, registerUser, resetPassword, updateUser, uploadAvatar, userDetails, verifyEmail, verifyForgotPasswordOTP } from '../controllers/userController.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'

const userRouter = Router()

userRouter.post('/register',registerUser)
userRouter.post('/verify-email',verifyEmail)
userRouter.post('/login',login)
userRouter.post('/logout',auth,logout)
userRouter.put('/upload-avatar',auth,upload?.single('avatar'),uploadAvatar)
userRouter.put('/update-user',auth,updateUser)
userRouter.put('/forgot-password',forgotPassword)
userRouter.put('/verify-forgot-password-otp',verifyForgotPasswordOTP)
userRouter.put('/reset-password',resetPassword)
userRouter.post('/refresh-token',refreshToken)
userRouter.get('/user-details',auth,userDetails)

export default userRouter
