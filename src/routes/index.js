"use strict";
// const express = require("express");
var routerPay = require("express").Router();
var stripePayment = require("../controller").stripePayment;
routerPay.post("/", stripePayment);
module.exports = routerPay;
