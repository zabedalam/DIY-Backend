require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.stripePayment = async (req: any, res: any) => {
  const {email, name } = req.body;

  if (true) { // Data is valid!
    try {
      // Create a PI:
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 5000, // In cents
        currency: 'usd',
        receipt_email: email,
      });
      // res.render('card', {name: name,  intentSecret: paymentIntent.client_secret });
      res.json({ name: name,client_secret: paymentIntent["client_secret"]});
    } catch(err) {
      console.log('Error! ', err.message);
    }
  } 

  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: 5000,
  //   currency: "usd",
  //   metadata: { integration_check: "accept_a_payment" },
  //   receipt_email: email,
  // });

  // res.json({ client_secret: paymentIntent["client_secret"] });
};

exports.stripeSubscription = async (req: any, res: any) => {
  const { email,name, payment_method } = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    name:name,
    invoice_settings: {
      default_payment_method: payment_method
    }
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: "price_1IT5CGG6np2P9MdlAPbEdxjP" }],
    expand: ["latest_invoice.payment_intent"]
  });

  const status = subscription["latest_invoice"]["payment_intent"]["status"];
  const client_secret =
    subscription["latest_invoice"]["payment_intent"]["client_secret"];

  res.json({ client_secret: client_secret, status: status });
};
