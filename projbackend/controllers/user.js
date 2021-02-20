const User = require("../models/user")
const Order = require("../models/order")



exports.getUserById = (req,res,next,id) =>{
    User.findById(id).exec((err,user) => {
     if(err || !user){
         return res.status(400).json({
             error :"No User was found in DB"
         })
     }
     req.profile = user
     next()
    })
}



exports.getUser = (req,res) =>{
     req.profile.salt = undefined;//we r making undef in user profile n not in DB
      req.profile.encry_password = undefined;//bcoz we don't want them to be shown
      req.profile.createdAt = undefined;
      req.profile.updatedAt = undefined;

    return res.json(req.profile)//since we already declared req.profile to user above
}


// exports.getAllUsers = (req,res) =>{
//     User.find().exec((err,users) => {
//      if(err || !users){
//          return res.status(400).json({
//              error :"No Users in DB"
//          })
//      }
//      res.json({users})
//     })
// }

exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user) => {
            if(err){
                return res.status(400).json({
                    error:"you are not authorized to update this user"

                })
            }
            user.salt = undefined
            user.encry_password = undefined//since user is expected back
            res.json(user)

        }
    )


}

exports.userPurchaseList = (req,res) => {
    Order.find({user:req.profile._id})
    .populate("user", "_id name email")
    .exec((err,order) => {
        if(err){
            return res.status(400).json({
                error:"No Orders in this User Account"
            })
        }
        return res.json({order})
    })

}

exports.pushOrderInPurchaseList =(req,res,next) =>{

let purchases =[]
req.body.order.products.forEach(product =>{
    purchases.push({
        _id: product._id,
        name:product.name,
        description:product.description,
        category:product.category,
        quantity:product.quantity,
        amount:req.body.order.amount,
        transcation_id:req.body.order.transcation_id

    })
})

User.findByIdAndUpdate(
    {_id: req.profile._id},
    {$push:{purchases: purchases}},//1=> user model purchases 2=> above purchases
    {new:true},//frm the DB Get the Updated info not the old one
    (err,purchases) => {
        if(err){
            return res.status(400).json({
                error : "Unable to save Purchase list"
            })

        }
        next()

    }
)

}