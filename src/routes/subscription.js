"use strict";
// const express = require("express");
var routerSub = require("express").Router();
var stripeSubscription = require("../controller").stripeSubscription;
routerSub.post("/", stripeSubscription);
module.exports = routerSub;
