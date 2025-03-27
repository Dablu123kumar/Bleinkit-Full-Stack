import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()
import verificationEmailTemplate from '../utills/verificationEmailTemplate.js'
import generateAccessToken from '../utills/generateAccessToken.js'
import generateRefreshToken from '../utills/generateRefreshToken.js'
import uploadImageCloudinary from '../utills/uploadImageCloudinary.js'
import generateOTP from '../utills/generateOTP.js'
import forgotPasswordTemplate from '../utills/forgotPasswordTemplate.js'

// user registeration
export const registerUser = async (req,res) => {
     try {
        const {name,email,mobile,password} = req.body
        
        if(!name || !email || !mobile ||  !password){
            return res.status(400).json({
                message: "Please fill all fields",
                success : false,
                error:true
            })
        }

        const  user = await UserModel.findOne({email})

        if(user){
            return res.status(400).json({
                message: "Email already exists",
                success :false,
                error : true
            })
        }

        const  salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            mobile,
            password : hashedPassword
        }
        const newUser = new UserModel(payload)
        const save = await newUser.save()
         
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        const verificationEmail = await sendEmail({
            sendTo : email,
            subject : "email verification from blinkit",
            html : verificationEmailTemplate({
                  name,
                  url : verifyEmailUrl
            })
        })
        return res.status(200).json({
            message : "User created successfully",
            success : true,
            error : false,
            data : save
        })
     } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
     }
}

// email verification
export const verifyEmail = async(req,res) => {
    try {
        const {code} = req.body

        const user  = await UserModel.findOne({_id : code})

        if(!user){
            return res.status(400).json({
                message : "Invalid code",
                success : false,
                error : true,
               
            })   
        }

        const updateUser = await UserModel.updateOne({_id : code},{
            verify_email :true
        })

        return res.status(200).json({
            message : " Email verification done ",
            success : true,
            error : false,
            data : updateUser
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

// user login

export const login = async (req,res)=>{
    try {

        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message : " Please provide  your email and  password",
                success : false,
                error : true,
              
            })
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : " Email does not  exists ",
                success : false,
                error : true,
              
            })
        }

      if(user?.status !== "Active"){
        return res.status(400).json({
            message : " Contact to Admin or visit customer support ",
            success : false,
            error : true,
          
        })
      }

      const checkPassword = await bcryptjs.compare(password,user?.password)

      if(!checkPassword){
        return res.status(400).json({
            message : " Email or Ppassword is invalid",
            success : false,
            error : true,
          
        })
      }

      const accessToken = await generateAccessToken(user?._id)
      const refreshToken = await generateRefreshToken(user?._id)

      const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
        last_login_date : new Date()
      })
      const cookieOption = {
        httpOnly : true,
        secure : true,
        sameSite : "None"
      }
      res.cookie('accessToken',accessToken,cookieOption)
      res.cookie('refreshToken',refreshToken,cookieOption)

        return res.status(200).json({
            message : " Login successful, please refresh browser ",
            success : true,
            error : false,
            data : {
                accessToken,
                refreshToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error, 
            success : false,
            error : true
        })
    }
}

// logout 

export const logout = async(req,res)=>{
    try {
         const userId = req.userId /// middleware
        const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
          }
        res.clearCookie("accessToken",cookieOption)
        res.clearCookie("refreshToken",cookieOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId,{refresh_token : ""})
        return res.status(200).json({
            message : " user successfully logout ",
            success : true,
            error : false,
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}


/// upload user avatar

export const uploadAvatar = async(req,res)=>{
    try {
        const userId = req.userId /// auth middleware
        const image = req.file /// multer middleware

        const upload = await uploadImageCloudinary(image)
       
        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload?.url
        })
        return res.status(200).json({
            message : " upload profile successfull ",
            success : true,
            error : false,
            data : {
                _id : userId,
                avatar : upload?.url
            }
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}


// update user details

export const updateUser = async(req,res) => {
    try {
        const userId = req.userId /// auth middleware
        const {name,email,password,mobile} = req.body
        let hashedPassword = ""

        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashedPassword = await bcryptjs.hash(password,salt)
        }
        const updateUser = await UserModel.updateOne({_id : userId},{
            ...(name && {name : name}),
            ...(email && {email : email}),
            ...(password && {password : hashedPassword}),
            ...(mobile && {mobile : mobile}),
        })

        return res.status(200).json({
            message : " update user successfull ",
            success : true,
            error : false,
            data : updateUser
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}


/// forgot password when user not login


export const forgotPassword = async(req,res)=>{
    try {
        const {email} = req.body

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : 'Email does not exists',
                success : false,
                error : true
            })
        }

        const otp = generateOTP()
        const expireTime = new Date() + 60*60*1000 // 1hr

        const update = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
        })
        await sendEmail({
            sendTo : email,
            subject : 'Forgot password from blinkit',
            html : forgotPasswordTemplate({
                name : user?.name,
                otp:otp
            })
        })

        return res.status(200).json({
            message : " Please check your email",
            success : true,
            error : false,
            data : update
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

// verify forgotPassword otp
export const verifyForgotPasswordOTP =async(req,res)=>{
    try {
        
        const  {email,otp} = req.body
        if(!email || !otp){
            return res.status(400).json({
                message : 'Please provede email or otp',
                success : false,
                error : true
            })
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : 'Email does not exists',
                success : false,
                error : true
            })
        }
 
        const currentTime = new Date().toISOString()

        if(user?.forgot_password_expiry < currentTime){
            return res.status(400).json({
                message : 'OTP has been expired',
                success : false,
                error : true
            })
        }

        if(otp !== user?.forgot_password_otp){
            return res.status(400).json({
                message : 'Invalid otp',
                success : false,
                error : true
            })
        }

        // if otp is not expire and otp === forgot_password_otp

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{    
            /// set null if once password changed
            forgot_password_otp : "",
            forgot_password_expiry :""
        })
        return res.status(200).json({
            message : 'OTP verification successfully',
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

/// reset password 

export const resetPassword = async(req,res)=>{
    try {
        
        const {email,newPassword,confirmPassword} = req.body

        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                message : 'Please provide all fields(email,newPassword,confirmNewPassword)',
                success : false,
                error : true
            })
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : 'Email does not exists',
                success : false,
                error : true
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message : 'newPassword and confirmPassword does not matched',
                success : false,
                error : true
            })
        }

        const salt  = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword,salt)
     const update = await UserModel.findByIdAndUpdate(user?._id,{
           password : hashedPassword
     })
     
     return res.status(200).json({
        message : 'Password updated successfully',
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


/// refresh token controller

export const refreshToken = async(req,res)=>{
    try {
        
        const refreshToken = req.cookies?.refreshToken || req.headers?.authorization?.split(" ")[1]

          if(!refreshToken){
            return res.status(401).json({
                message : 'Unauthorezed access! or invalid token',
                success : false,
                error : true
            })
          }

          const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

          if(!verifyToken){
            return res.status(401).json({
                message : 'Token is expired!',
                success : false,
                error : true
            })
          }
          console.log('verifytoken',verifyToken)
          const userId = verifyToken?._id

          const newAccessToken = await generateAccessToken(userId)
          const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
          }
         
          res.cookie('accessToken',newAccessToken,cookieOption)

          return res.status(200).json({
            message : 'NewAccessToken generated',
            success : true,
            error : false,
            data : {
                accessToken : newAccessToken
            }
        })
         
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

// get logedin user details

export const userDetails = async(req,res)=>{
    try {
        const userId = req.userId
        
        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return  res.status(200).json({
            message : 'User details',
            success : true,
            error : false,
            data : user
        })
    } catch (error) {
        return  res.status(500).json({
            message : 'Something is wrong!',
            success : false,
            error : true,
            
        })
    }
}


