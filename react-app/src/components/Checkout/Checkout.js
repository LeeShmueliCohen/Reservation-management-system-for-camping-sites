import { useEffect, useState } from 'react';
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Checkout.css';
import ProcessStep from '../Sites/ProcessStep';
import CheckoutFormPlaceHolder from './CheckoutFormPlaceHolder';

function Checkout() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [bookingId, setBookingId] = useState(null);

  const items = useSelector((state) => state.cart.items);
  const isLoading = useSelector((state) => state.isDataLoad);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice > 0) {
      fetch(`${process.env.REACT_APP_API_URL}/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalPrice }),
      })
        .then(async (result) => {
          const { clientSecret } = await result.json();
          setClientSecret(clientSecret);
        })
        .catch((error) => {
          console.error('Error:', error);
          navigate('/oops');
        });
    }
  }, [navigate, totalPrice]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/payment/config`).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey, { locale: 'he' }));
    });
  }, []);

  const options = {
    clientSecret,
    // אפשר לראות באתר הרשמי את ההגדרות
    appearance: {
      theme: 'stripe',
    },
  };

  useEffect(() => {
    if (!isLoading && items.length < 1 /*&& bookingId !== null*/) {
      navigate('/cart');
    }
  }, [items, navigate, isLoading, bookingId]);

  return (
    <Container className="cart-wrapper">
      <ProcessStep currentStep={'2'} />
      {isLoading ? (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          <Col md={8}>
            <Col md={6} className="center">
              {clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm
                    bookingId={bookingId}
                    setBookingId={setBookingId}
                  />
                </Elements>
              ) : (
                <CheckoutFormPlaceHolder />
              )}
            </Col>
          </Col>
          <Col md={4}>
            <div className="card-item" style={{ padding: '1rem' }}>
              <h2>סיכום הזמנה</h2>
              <p>
                <b>פירוט:</b>
              </p>
              {items.map((placeObj) => (
                <div key={placeObj.item_id}>
                  {placeObj.name}
                  <hr />
                </div>
              ))}{' '}
              <br />
              {!totalPrice ? (
                <div className="spinner">
                  <Spinner animation="border" />
                </div>
              ) : (
                <p>
                  <b> סה"כ: </b>₪{totalPrice}
                </p>
              )}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Checkout;
