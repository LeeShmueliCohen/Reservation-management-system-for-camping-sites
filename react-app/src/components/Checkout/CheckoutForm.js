import { PaymentElement } from '@stripe/react-stripe-js';
import { useState, useEffect, useCallback } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { createBooking, updateBooking } from '../../utils/useBookingApi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import FormFields from './FormFields';
import { useNavigate } from 'react-router-dom';

const requiredFieldMessage = 'שדה חובה';
const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z\u0590-\u05FF]+$/i, 'השם לא תקין')
    .required(requiredFieldMessage),
  lastName: yup
    .string()
    .matches(/^[A-Za-z\u0590-\u05FF]+$/i, 'שם המשפחה לא תקין')
    .required(requiredFieldMessage),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'אימייל לא תקין')
    .email('האמייל לא תקין')
    .required(requiredFieldMessage),
  phoneNumber: yup
    .string()
    .matches(/^0\d{9}$/, 'חייב להתחיל עם 0 ולהכיל 10 ספרות')
    .required(requiredFieldMessage),
});

function CheckoutForm({ bookingId, setBookingId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe, bookingId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setBookingId(null);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }
    setIsProcessing(true);
    const bookingIdApi = await createBooking(data);
    setBookingId(bookingIdApi);
    setCustomerDetails(data);
  };

  const execute = useCallback(async () => {
    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: `${customerDetails.firstName} ${customerDetails.lastName}`,
            email: `${customerDetails.email}`,
            phone: `${customerDetails.phoneNumber}`,
          },
          metadata: {
            booking_id: bookingId,
          },
        },
      },
      redirect: 'if_required',
    });
    if (response.error) {
      if (
        response.error.type === 'card_error' ||
        response.error.type === 'validation_error'
      ) {
        setMessage(response.error.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
    } else {
      await updateBooking(bookingId, 'PAID');

      await fetch(`${process.env.REACT_APP_API_URL}/payment/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentIntentId: response.paymentIntent.id }),
      }).catch((error) => {
        console.error('Error:', error);
      });

      setMessage(`Payment Succeeded: ${response.paymentIntent.id}`);

      navigate(`/checkout/confirm/${bookingId}`);
    }
  }, [stripe, elements, bookingId, setMessage, customerDetails, navigate]);

  useEffect(() => {
    if (bookingId !== null && isProcessing) {
      execute();
    }
  }, [execute, bookingId, isProcessing]);
  const innerCardStyle = { padding: '1rem' };

  return (
    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="card-item">
        <div style={innerCardStyle}>
          <h2>פרטיים אישיים</h2>
          <FormFields register={register} errors={errors} />
        </div>
      </div>
      <div className="card-item">
        <div style={innerCardStyle}>
          <h2>תשלום</h2>
          <PaymentElement
            id="payment-element"
            options={{
              layout: 'tabs',
              paymentMethodOrder: ['apple_pay', 'google_pay', 'card'],
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          style={{
            width: '100%',
          }}
          className="primary-button button-hover-white"
          disabled={isProcessing || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isProcessing ? 'מבצע תשלום... ' : 'שלם עכשיו'}
          </span>
        </button>
      </div>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutForm;
