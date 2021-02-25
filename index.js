const express=require('express')
const uuid=require('uuidv4')
const stripe =require("stripe")("")
const cors =require("cors")
const morgan=require("morgan")
require("dotenv").config()

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