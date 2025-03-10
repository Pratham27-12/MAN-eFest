const asyncWrapper = require("../middleWare/asyncWrapper");

exports.processPayment = asyncWrapper(async (req, res, next) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "manefest", 
    },
  });

  res
    .status(200)
    .json({ sucess: true, client_secret: myPayment.client_secret });
});



exports.sendStripeApiKey = asyncWrapper(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});