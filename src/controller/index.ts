import {v4 as uuid} from "uuid"
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

type  validType=number | string 
type objectType={
  body:{
        donation:number,
        token:string,
        
        
      }

    }

type userType={
  name:string,
  email:string,
  id:string
}
exports.stripePayment = (req:any, res:any):objectType => {
  const { donation, token } = req.body;
  const idempontencyKey = uuid();

  return stripe.donars
    .create({
      email: token.email,
      source: token.id
    })
    .then((donar:userType) => {
        
      stripe.charges.create(
        {
          amount: donation.price * 100,
          currency: "usd",
          donar: donar.id,
          receipt_email: token.email,
          description: `Donation of ${donation.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country
            }
          }
        },
        { idempontencyKey }
      );
    })
    .then((result:validType) => res.status(200).json(result))
    .catch((e:objectType) => {
      console.log(e);
      res.json({
        message: "Error Occurred"
      });
    });
};
