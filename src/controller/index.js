"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
require("dotenv").config();
var stripe = require("stripe")(process.env.STRIPE_KEY);
exports.stripePayment = function (req, res) {
    var _a = req.body, product = _a.product, token = _a.token;
    var idempontencyKey = uuid_1.v4();
    return stripe.customers
        .create({
        email: token.email,
        source: token.id
    })
        .then(function (customer) {
        stripe.charges.create({
            amount: product.price * 100,
            currency: "usd",
            donar: customer.id,
            receipt_email: token.email,
            description: "Donation of " + product.name,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempontencyKey: idempontencyKey });
    })
        .then(function (result) { return res.status(200).json(result); })
        .catch(function (e) {
        console.log(e);
        res.json({
            message: "Error Occurred"
        });
    });
};
