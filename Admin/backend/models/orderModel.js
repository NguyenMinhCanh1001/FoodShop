import mongoose from "mongoose";

const orderSchema = new mongoose.Schema ({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true,},
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref:"Product", require: true,},
        quantity: { type: Number, required: true, min: 1,},
        price: { type: Number, required: true,}, 
     },],
     totalAmount: { type: Number, required: true,},
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending'
  },
  status: { type: String, enum: ["pending", "processing", "delivered", "cancelled"], default: "pending", },
  createdAt: { type: Date, default: Date.now, },
  updatedAt: Date,
  shippingAddress: String,
});

const orderModel = mongoose.model('Order', orderSchema)
export default orderModel