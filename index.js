const express=require('express')
require("dotenv").config()
const cors =require("cors")
const morgan=require("morgan")


const app=express()

// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// routes
app.get("/",(req,res)=>{
    res.send("Welcome to DIY Foundation")
})


app.listen(process.env.PORT,()=>console.log(`I am Listening at ${process.env.PORT}`))