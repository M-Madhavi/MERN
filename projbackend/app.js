require('dotenv').config()


const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
//const stripeRoutes = require("./routes/stripepayment")
const paymentBRoutes = require("./routes/paymentBRoutes")

//DB Connection
const mongoose = require('mongoose');
mongoose
.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(() =>{
    console.log("DB CONNECTED")
})
// .catch(console.log("DB is Not Connected OOOOOOps!!!"))

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json

//Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


//My Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
//app.use("/api",stripeRoutes)
app.use("/api",paymentBRoutes)




//Port
const port = process.env.PORT || 9000;

//Starting the Server
app.listen(port,() =>{
    console.log(`app is running at port ${port}`)

})































