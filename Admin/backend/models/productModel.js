import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  stock: { type: Number, default: 0 },// số lượng tồn kho
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isActive: {type: Boolean, default: true},
  createdAt: { type: Date, default: Date.now }
})

const Product = mongoose.model('Product', productSchema)
export default Product
