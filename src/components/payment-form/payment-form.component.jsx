import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';//stripe-card-elememt

import { useState } from 'react';//?

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartTotalPrice } from '../../store/cart/cart.selector';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentFormContainer, FormContainer, PaymentBUtton } from './payment-form.styles';


const PaymentForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotalPrice);
  const currentUser = useSelector(selectCurrentUser);
  const [ isProcessingPayment,  setIsProcessingPayment ] = useState(false); //default

  //1) fetch payment intent from netlify
  //2) complete payment with card information
  //testing credit card: 4242 4242 4242 4242 , date in future, 3-digit code random
  const paymentHandler = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    //reponse returns a newly created paymentIntent by Netlify (with amount value)
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then(res => res.json());

    const { paymentIntent: { client_secret } } = response;//destucturing out client_secret

    //step 2, finish paymentIntent (client_secret) with card information
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {//more fields could fille, like billing address, phone number etc
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      console.log(paymentResult.error);
      alert(paymentResult.error.message);
    } else if (paymentResult.paymentIntent.status === 'succeeded') {
      alert("Payment Successful");
    }

  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler} >
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentBUtton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay now </PaymentBUtton>
      </FormContainer>
    </PaymentFormContainer>
  )

}

export default PaymentForm;