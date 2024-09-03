// CheckoutForm.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm({ handlePaymentSubmission, handleSaveCardChange, saveCard }) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.log('Payment method creation failed:', error);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            handlePaymentSubmission(paymentMethod, stripe);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <label>
                Save card for future payments
                <input
                    type="checkbox"
                    onChange={handleSaveCardChange}
                    checked={saveCard}
                />
            </label>
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
}

export default CheckoutForm;
