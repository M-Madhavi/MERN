const Product = require("../models/product")
const User = require("../models/user")
const {Order,ProductCart} = require("../models/order")


exports.getOrderById = (req,res,next,id) => {
 Order.findById(id)
 .populate("products.product","name price")
 .exec((err,order) =>{
     if(err){
         return res.status(400).json({
             error:"No Order Found in DB"
         })
     }
     req.order = order
     next()
 })
}

exports.createOrder = (req,res) =>{
    req.body.order.user = req.profile//since ref:user(order is dependent on user)
    const order = new Order(req.body.order)
    order.save((err,order) => {
        if(err){
            return res.status.json({
                error:"Failed to save ur order in DB"
            })
        }
        res.json({order})
    })
}

exports.getAllOrders =(req,res) =>{
    Order.find()
    .populate("user","_id name purchases")
    .exec((err,orders) => {
        if(err){
            return res.status(400).json({
                error:"No orders found in DB"
            })
        }
        res.json({orders})
    })
}


exports.getOrderStatus = (req,res) =>{
    res.json(Order.schema.path("status").enumValues)

}

exports.updateStatus = (req,res) => {
    Order.updateOne(
        {_id:req.body.orderId},
        {$set:{status: req.body.status}},
        (err,order) => {
            if(err){
                return res.status(400).json({
                    error:"Cannot update Order status"
                })
            }
            res.json({order})

        }
    )

}
