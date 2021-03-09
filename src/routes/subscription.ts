// const express = require("express");
const routerSub=require("express").Router();
const {stripeSubscription}=require("../controller")

routerSub.post("/",stripeSubscription)


module.exports=routerSub