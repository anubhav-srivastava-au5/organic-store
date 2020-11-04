const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema=new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    image: { type: String, required: true},
    price: { type: Number,default:0, required: true },
    countInStock: { type: Number, required: true },
    category: { type: String, required: true},
    description: { type: String }
    // // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true  },
    // createdAt: { type: Date, default: Date.now },
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    // updatedAt: Date,
    // updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
})

module.exports=Products=mongoose.model('products',ProductSchema)