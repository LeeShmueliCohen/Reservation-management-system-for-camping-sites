import './Place.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Col, Row } from 'react-bootstrap';
import { translateErrorStatus } from '../../../utils/hebrew';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addItemCart } from '../../../store/cart-actions';
import { cartActions } from '../../../store/cart-slice';

function Place({ placeObj, onClick, active }) {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  let isExistCart = false;
  for (let item of items) {
    if (item.slip === placeObj.slip) {
      isExistCart = true;
    }
  }

  const handleAddItem = (item) => {
    dispatch(addItemCart(item.id, item.slip));
    dispatch(cartActions.showCart(true));
  };

  const placeClassNames = [
    'place',
    placeObj.status !== 'AVAILABLE' ? 'unavailable' : '',
    placeObj.shape,
    isExistCart ? 'active' : '',
  ]
    .join(' ')
    .trim();

  const popover = (props) => (
    <Popover id={`tooltip-${placeObj.id}`} {...props}>
      <Popover.Body>
        <Row>
          <Col className="col" sm={7}>
            <h6 style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {' '}
              {placeObj.title}
            </h6>
            <h6 style={{ color: placeObj.available === 0 ? 'red' : '' }}>
              &rlm; {placeObj.available}
              {` מקומות פנויים`}
            </h6>
            <div style={{textAlign:"center"}}>
              &rlm;{placeObj.price.title}
              {isExistCart && (
                <div style={{ color: 'green', fontSize: '12px' }}>
                  הפריט נוסף לסל הקניות
                </div>
              )}
              {/*` ללילה`*/}
            </div>
          </Col>
          <Col className="col" sm={5}>
            <img src={placeObj.smallImg} alt="small" />
          </Col>
        </Row>
        {placeObj.error ? (
          <span className="error-status">
            {translateErrorStatus(placeObj.error.title)}
          </span>
        ) : (
          <div style={{ margin: 'auto', width: '50%' }}>
            <button
              onClick={() =>
                handleAddItem({
                  id: placeObj._id,
                  slip: placeObj.slip,
                })
              }
              className="primary-button add-cart"
              style={{
                padding: '2px 4px',
                position: 'relative',
                bottom: '-5px',
              }}
            >
              {'הוספה לסל'} &nbsp;
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          </div>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      placement={placeObj.label === 'חושות' ? 'top' : 'auto'}
      overlay={popover}
      trigger="click"
      rootClose
    >
      <span
        style={{
          top: `${placeObj.top}%`,
          left: `${placeObj.left}%`,
        }}
        className={placeClassNames}
      >
        {placeObj.name}
      </span>
    </OverlayTrigger>
  );
}

export default Place;
