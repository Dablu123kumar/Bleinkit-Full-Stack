import SummaryAPI from '../common/SummaryApi'
import Axios from '../Utils/Axios'
const uploadImage = async(image)=>{
    try {
        const formData = new FormData()
        formData.append('image',image)
        const response  = await Axios({
            ...SummaryAPI.uploadImage,
            data : formData
        })
        return response
    } catch (error) {
        return error
    }
}

export default uploadImage