"use strict";
var express = require('express');
var uuid = require('uuidv4');
var stripe = require("stripe")("");
var cors = require("cors");
var morgan = require("morgan");
require("dotenv").config();
var app = express();
// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
// routes
app.get("/", function (req, res) {
    res.send("Welcome to DIY Foundation");
});
app.listen(process.env.PORT, function () { return console.log("I am Listening at " + process.env.PORT); });
