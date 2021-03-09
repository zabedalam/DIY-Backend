// const express = require("express");
const routerPay=require("express").Router();
const {stripePayment}=require("../controller")

routerPay.post("/",stripePayment)


module.exports=routerPay