const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISH_KEY,
  });
});

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { totalPrice } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'ILS',
      amount: 100 * totalPrice,
      automatic_payment_methods: { enabled: true },
      /*metadata: {
        booking_id: 'try',
      },*/
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

router.post('/', async (req, res) => {
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'ILS',
      description: 'Workshop82',
      payment_method: id,
      confirm: true,
    });
    res.json({
      message: 'Payment successful',
      success: true,
    });
  } catch (error) {
    console.log('Error', error);
    res.json({
      message: 'Payment failed',
      success: false,
    });
  }
});

router.patch('/:bookingId', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const { bookingId } = req.params;
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      metadata: {
        booking_id: bookingId,
      },
    });

    // Send publishable key and PaymentIntent details to client
    res.send(paymentIntent);
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;
