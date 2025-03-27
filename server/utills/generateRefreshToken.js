import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserModel from '../models/userModel.js'
dotenv.config()
const generateRefreshToken = async(userId)=>{
       const token = await jwt.sign({id:userId},
        process.env.SECRET_KEY_REFRESH_TOKEN,
        {expiresIn : '30d'}
    )

    const updateRefreshToken = await UserModel.updateOne(
         {_id : userId},
         {
               refresh_token : token
         }
   )
    return token
}

export default  generateRefreshToken