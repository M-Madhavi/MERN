const mongoose = require("mongoose")
const user = require("./user")

const {ObjectId} = mongoose.Schema

const ProductCartSchema = new mongoose.Schema({
    product :{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number

})
const ProductCart = mongoose.model("ProductCart",ProductCartSchema)


// module.exports = {Order,ProductCart}




const orderSchema = new mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{type:Number},
    address:{
        type :String
    },
    status:{
        type:String,
        default:"Received",
        enum:["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
},
{timestamps:true})

const Order = mongoose.model("Order",orderSchema)

module.exports = {Order,ProductCart}
