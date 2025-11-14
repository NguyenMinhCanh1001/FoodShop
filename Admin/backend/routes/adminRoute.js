import express from 'express'
import { loginAdmin } from '../controller/adminController.js'

const adminRouter = express.Router()
adminRouter.post('/login', loginAdmin)

export default adminRouter