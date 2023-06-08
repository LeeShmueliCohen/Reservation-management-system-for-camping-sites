import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getBookingDetails } from '../../utils/useBookingApi';
import { useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ProcessStep from '../Sites/ProcessStep';
import { cartActions } from '../../store/cart-slice';
import { useDispatch } from 'react-redux';

function Confirm() {
  const dispatch = useDispatch();
  const [isFirst, setIsFirst] = useState(true);
  let { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState({});
  const navigate = useNavigate();

  const getDetails = useCallback(async () => {
    const dataDetails = await getBookingDetails(bookingId);
    if (dataDetails) {
      setBookingDetails(dataDetails);
    } else {
      navigate('/cart');
    }
  }, [bookingId, navigate]);

  useEffect(() => {
    if (isFirst) {
      getDetails();
      dispatch(cartActions.resetCart());
      setIsFirst(false);
    }
  }, [getDetails, isFirst, dispatch]);

  // console.log('print it');

  return (
    <Container className="cart-wrapper text-center">
      <ProcessStep currentStep={'3'} />
      {isFirst && (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      )}
      <br />
      <h3 style={{ fontWeight: '500' }}>
        היי {bookingDetails.customer_name}, הזמנתך התקבלה בהצלחה!
      </h3>
      <FontAwesomeIcon
        icon={faCircleCheck}
        bounce
        size="2xl"
        style={{ color: '#b3dd4f' }}
      />
      <p>
        <br />
        מזהה הזמנה: {bookingDetails.id}
      </p>
      <p>קבלה נשלחת למייל {bookingDetails.customer_email} ברגעים אלו</p>
      <p>
        לצפייה בפרטי ההזמנה{' '}
        <a
          href={`https://workshop-82-dvir.checkfront.com/reserve/booking/${bookingDetails.id}?token=${bookingDetails.token}&view=pdf`}
          target="_blank"
          rel="noreferrer"
        >
          {'לחץ כאן'}
        </a>
      </p>
      <br />
      <p>תודה שהזמנת אצלנו 😊</p>
      <br />
      <Link to="/" className="primary-button button-hover-white">
        <b> חזרה לדף הראשי</b>
      </Link>
    </Container>
  );
}
export default Confirm;
