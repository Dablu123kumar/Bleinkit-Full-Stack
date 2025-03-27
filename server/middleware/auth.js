import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const auth = async(req,res,next)=>{
try {
    const token = req?.cookies?.accessToken || req?.headers?.authorization?.split(" ")[1]      //// ["bearer", "token"]


    if(!token){
        return res.status(401).json({
            message :"please login",
            success : false,
            error : true
        })
    }

    const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

    if(!decode){
        return res.status(401).json({
            message :"Unauthorized access ",
            success : false,
            error : true
        })
    }
    req.userId = decode?.id
    next()
    console.log('decode',decode)
} catch (error) {
    return res.status(500).json({
        message : "please login" || error ,
        success : false,
        error : true
    })
}
}

export default auth