"use strict";
var express = require('express');
var uuid = require('uuidv4');
var cors = require("cors");
var morgan = require("morgan");
var payRoute = require("./src/routes");
var subRoute = require("./src/routes/subscription");
require("dotenv").config();
var stripeVal = require("stripe")(process.env.STRIPE_KEY);
var app = express();
// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use("/stripePayment", payRoute);
app.use("/stripeSubscription", subRoute);
app.get("/", function (req, res) {
    res.send("Welcome to DIY Foundation");
});
app.listen(process.env.PORT, function () { return console.log("I am Listening at " + process.env.PORT); });
