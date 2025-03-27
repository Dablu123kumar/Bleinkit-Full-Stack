import uploadImageCloudinary from "../utills/uploadImageCloudinary.js"

const uploadImagesController = async(req,res)=>{
    try {
        const imageFile = req.file
       const uploadImage = await uploadImageCloudinary(imageFile)
       return res.status(200).json({
        message : "image uploaded successfully",
        error : false,
        success : true,
        data : uploadImage
    })
    } catch (error) {
        return res.ststus(500).json({
            message : error.message ||error,
            error : true,
            success : false
        })
    }
}
export default uploadImagesController