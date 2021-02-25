const express=require('express')
const cors =require("cors")
const morgan=require("morgan")
const paymentRoutes=require("./src/routes")
require("dotenv").config()

const app=express()

// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use("/payment",paymentRoutes)

// routes

app.get("/",(req,res)=>{
    res.send("Welcome to DIY Foundation")
})


app.listen(process.env.PORT,()=>console.log(`I am Listening at ${process.env.PORT}`))