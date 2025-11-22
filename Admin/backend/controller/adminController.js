import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from 'jsonwebtoken';
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
const addProduct = async(req, res)=>{
    try{
        const {name, description, price, stock, category }=req.body
        const imageFile =req.file

        if(!name || !description|| !price|| !stock|| !category){
            return res.json({success:false, message:"missing details"})
        }
        if(!imageFile){
            return res.json({success:false, message:"No image file uploaded!"})
        }
        
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const productData = {
            name,
            description,
            price,
            image: imageUrl,
            stock,
            category,
            isActive: true,
            date: Date.now()
        }
        const newProduct = new productModel(productData)
        await newProduct.save()
        res.json({success:true, message:"product add"})
    }catch(error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const allProduct = async(req, res) =>{
    try{
        const products = await productModel.find()
        res.json({success:true, products})
    } catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
    }
}
const allOrder = async(req,res) =>{
    try{
        const orders = await orderModel.find()
        res.json({success:true, orders})
    } catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const orderStatus = async (req, res) =>{
    try{
        const {orderId} = req.body
        const orderData = await orderModel.findById(orderId)
        if (!orderData){
            return res.json({success:false, message:"Order not found"})
        }
        if(orderData.status === "delivered"){
            return res.json({success: false, message: "Đơn hàng đã giao – không thể hủy!"})
        }
        orderData.status = "cancelled"
        orderData.updatedAt =new Date()
        await order.save();
        res.json({success:true,message:"Hủy đơn hàng thành công"})

    }catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
    }
}
const allUser = async(req,res) =>{
    try{
        const users = await userModel.find({}).select('-password')
        res.json({success:true, users})

    } catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
export {loginAdmin, addProduct, allProduct, allOrder, orderStatus, allUser }