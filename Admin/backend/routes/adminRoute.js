import express from 'express'
import { addProduct, loginAdmin, allProduct, allOrder, orderStatus, allUser } from '../controller/adminController.js'
import authAdmin from '../middlewares/authAdmin.js'
import upload from '../middlewares/multer.js'

const adminRouter = express.Router()
adminRouter.post('/login', loginAdmin)
adminRouter.post('/addproduct',authAdmin,upload.single('image'),addProduct)
adminRouter.get('/all-order', authAdmin, allOrder)
adminRouter.get('/all-product', authAdmin, allProduct)
adminRouter.post('/orderstatus', authAdmin, orderStatus)
adminRouter.get('/alluser', authAdmin, allUser)


export default adminRouter