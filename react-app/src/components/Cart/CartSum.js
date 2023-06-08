import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function CartSum({ totalPrice }) {
  return (
    <>
      <h3 style={{ textAlign: 'center' }}>סיכום הזמנה</h3>
      <div
        className="card-item card-item-sum"
        style={{ padding: '1rem 1.5rem' }}
      >
        <Row>
          <Col xs={6}>
            <span className="final-price-label"> סה"כ לתשלום</span>
          </Col>
          <Col xs={6} style={{ textAlign: 'left' }}>
            {totalPrice === 'loading price' ? (
              <div className="spinner">
                <Spinner animation="border" />
              </div>
            ) : (
              <span className="final-price">₪{totalPrice}</span>
            )}
          </Col>
        </Row>
        <br />
        <Row>
          <input type="text" id="coupon" placeholder="קוד קופון" />
        </Row>
        <Row className="justify-content-md-center">
          <br />
          <Link
            to="/checkout"
            className="primary-button"
            style={{ width: '98%', margin: '1rem 0' }}
          >
            לתשלום
          </Link>
        </Row>
      </div>
    </>
  );
}

export default CartSum;
