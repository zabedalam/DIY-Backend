const express=require('express')
const uuid=require('uuidv4')
const cors =require("cors")
const morgan=require("morgan")
const payRoute=require("./src/routes")
const subRoute=require("./src/routes/subscription")

require("dotenv").config();
const stripeVal = require("stripe")(process.env.STRIPE_KEY);



const app=express()

// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use("/stripePayment",payRoute)
app.use("/stripeSubscription",subRoute)



app.get("/",(req:any,res:any)=>{
    res.send("Welcome to DIY Foundation")
})


app.listen(process.env.PORT,()=>console.log(`I am Listening at ${process.env.PORT}`))