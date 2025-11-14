import mongoose from "mongoose";
const categoryShema =  new mongoose.Schema({
    name: {type: String, required: true, unique: true,
  },
  description: String,
  createdAt: {type: Date, default: Date.now,
  }
});
const Category = mongoose.model('Category', categoryShema)
export default Category