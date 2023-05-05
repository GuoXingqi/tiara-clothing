require('dotenv').config();


//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')(STRIPE_SECRET_KEY);

//created a stripe payment intent
exports.handler = async (event) => {//exports is old js
  try {
    const { amount } = JSON.parse(event.body);//amount in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      payment_method_types: ['card'],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    }

  } catch (error) {
    console.log(error);

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    }
  }
}