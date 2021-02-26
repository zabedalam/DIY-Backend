const router=require("express").Router();
const {stripePayment}=require("../controller")

router.post("/",stripePayment)


module.exports=router