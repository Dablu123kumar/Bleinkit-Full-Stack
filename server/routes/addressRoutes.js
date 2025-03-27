import {Router} from 'express'
import auth from '../middleware/auth.js'
import { addAddresses, deleteAddress, getAddress, updateAddress } from '../controllers/addressControllers.js'

const addressRouter = Router()

addressRouter.post('/create',auth,addAddresses)
addressRouter.get('/get',auth,getAddress)
addressRouter.put('/update',auth,updateAddress)
addressRouter.delete('/dissable',auth,deleteAddress)

export default addressRouter


