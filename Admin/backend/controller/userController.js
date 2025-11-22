import validator from 'validator'
import bcrypt, { hash } from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import orderModel from '../models/orderModel.js';

const registerUser = async (req, res) =>{
    try{
        const {name, email, password} = req.body
        
        if (!name || !email || !password){
            return res.json({success: false, message:"Missing Details"})
        }
        
        if(!validator.isEmail(email)){
             return res.json({success: false, message:"Enter a valid email"})
        }

        if(password.length<8){
            return res.json({success: false, message:"Enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newuser = new userModel(userData)
        const user = await newuser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({success:true, token})

    } catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const loginUser = async (req,res) =>{
    try{
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        
        if(!user){
            return res.json({success:false, message:"user does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            return res.json({success:true, token})
        } else{
            res.json({success:false, message:"Invalid credentials"})
        }
    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getProfile = async(req,res)=>{
    try{
        const userId= req.userId
        const userData = await userModel.findById(userId).select("-password")
        res.json({success:true, userData})
    } catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const updateProfile = async (req,res) =>{
    try{
        const userId = req.userId
        const imageFile = req.file
        const {name, phone, address} = req.body

        if(!name || !phone || !address){
            return res.json({success: false, message: "Data Missing"})
        }
        await userModel.findByIdAndUpdate(userId,{name, phone, address: JSON.parse(address)})
         if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image: imageURL})

        }
         res.json({ success: true, message:"Profile Updated"})
    }catch(error){
        console.log(error)
        res.json({success:false, message: error.message})  
    }
}



const bookOrder = async (req, res) => {
  try {
    const { user, items, shippingAddress } = req.body;

    if (!user || !items || items.length === 0) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await productModel.findById(item.product);

      if (!product) {
        return res.json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} không đủ hàng`,
        });
      }

      // Trừ stock
      product.stock -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const newOrder = await orderModel.create({
      user,
      items: orderItems,
      totalAmount,
      shippingAddress,
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date(),
    });

    return res.json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
  }
}


const listOrder = async(req,res)=>{
    try {
        const userId = req.userId
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message})
    }
}

const cancelOrder = async(req,res) =>{
    try {
        const userId = req.userId
        const orderId = req.body
        const orderData = await orderModel.findById(orderId)

        if(!orderData){
            return res.json({success:false, message:"Order not found"})
        }

         if (orderData.userId.toString() !== userId.toString()) {
            return res.json({ success: false, message: 'Unauthorized action' });
        }

        orderData.status="cancelled"
        await orderData.save()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
    }
}

export {registerUser, loginUser, getProfile, updateProfile, bookOrder, listOrder, cancelOrder}