import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import Stripe from "stripe";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_PRIV_KEY);

// @desc: process payments through stripe
// @route: /api/payment
// @access: Private/Protected
export const makePayment = asyncHandler(async (req, res) => {
  const { total_order_value } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: total_order_value * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: payment.client_secret });
  } catch (error) {
    console.log(error);
  }
});
