require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.stripePayment = async (req: any, res: any) => {
  const { email } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
    receipt_email: email
  });

  res.json({ client_secret: paymentIntent["client_secret"] });
};

exports.stripeSubscription = async (req: any, res: any) => {
  const { email, payment_method } = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
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
