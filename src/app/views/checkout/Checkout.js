import { useState } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import { stripePromise } from './App';

import CheckoutForm from './CheckoutForm'

import { useAxios } from 'app/hooks/useAxios';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function Checkout({ paymentId, orderId, amount }) {

    const { api } = useAxios();

    const [clientSecret, setClientSecret] = useState('');
    const [saveCard, setSaveCard] = useState(false);

    const handlePaymentSubmission = async (paymentMethod, stripe) => {
          // Call backend to save the card details if saveCard is true
        const paymentDto = {
                saveCard: saveCard,
                currency: 'lkr',
                amount: amount,
                metaData: {paymentId: paymentId, orderId: orderId}
        }
        if(saveCard){
            paymentDto.linkedCardDto = [{
                offset: paymentMethod.card.last4, 
                expireDate: `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`, 
                cardType: paymentMethod
            }]
        }
        await api.post('/api/payment/create-payment-intent', {paymentDto})
            .then((res) => {
                setClientSecret(res.data.clientSecret);
            })
            .catch((err) => {
        
            })

      // Confirm PaymentIntent with payment method
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
      });

      if (error) {
          console.log('Payment failed:', error.message);
      } else {
          if (paymentIntent.status === 'succeeded') {
              console.log('Payment succeeded!');
          }
      }
  };

  const handleSaveCardChange = (event) => {
      setSaveCard(event.target.checked);
  };

  return (
      <Elements stripe={stripePromise}>
          <CheckoutForm
              handlePaymentSubmission={handlePaymentSubmission}
              handleSaveCardChange={handleSaveCardChange}
              saveCard={saveCard}
          />
      </Elements>
  );
};