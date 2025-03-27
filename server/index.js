import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import uploadImagesRouter from './routes/uploadImageRoutes.js'
import subCategoryRouter from './routes/SubCategoryRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import addressRouter from './routes/addressRoutes.js'
import orderRouter from './routes/orderRoutes.js'
dotenv.config()

const app = express()
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = process.env.PORT || 8000

app.get('/', (req,res) =>{
    res.json({
     message : "server is running"
    })
})

app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/file',uploadImagesRouter)
app.use('/api/subCategory',subCategoryRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)

connectDB().then(() => {
    app.listen(PORT,() =>{
        console.log(`server is running on PORT: ${PORT}`)
    })
})

