const uuid = require("uuidv4");
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.stripePayment = (req, res) => {
  const { donation, token } = req.body;
  const idempontencyKey = uuid();

  return stripe.donars
    .create({
      email: token.email,
      source: token.id
    })
    .then(donar => {
        
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
    .then(result => res.status(200).json(result))
    .catch(e => {
      console.log(e);
      res.json({
        message: "Error Occurred"
      });
    });
};
