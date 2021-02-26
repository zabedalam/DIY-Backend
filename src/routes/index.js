"use strict";
var router = require("express").Router();
var stripePayment = require("../controller").stripePayment;
router.post("/", stripePayment);
module.exports = router;
