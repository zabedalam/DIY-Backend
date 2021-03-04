"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
require("dotenv").config();
var stripe = require("stripe")(process.env.STRIPE_KEY);
exports.stripePayment = function (req, res) {
    var _a = req.body, donation = _a.donation, token = _a.token;
    var idempontencyKey = uuid_1.v4();
    return stripe.donars
        .create({
        email: token.email,
        source: token.id
    })
        .then(function (donar) {
        stripe.charges.create({
            amount: donation.price * 100,
            currency: "usd",
            donar: donar.id,
            receipt_email: token.email,
            description: "Donation of " + donation.name,
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
