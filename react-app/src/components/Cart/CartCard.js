import { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import {
  faCircleXmark,
  faMagnifyingGlassPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../../store/cart-actions';
import ItemImages from './ItemImages';
import PeopleAmount from './PeopleAmount';

function CartCard({ placeObj }) {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  const xCircleIcon = (
    <FontAwesomeIcon className="icon" icon={faCircleXmark} size="xl" />
  );
  const squareCheck = <FontAwesomeIcon icon={faSquareCheck} />;

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <Row key={placeObj.item_id} className="Card">
      <Col md={4} className="mx-auto text-center">
        <div style={{ cursor: 'pointer' }} onClick={() => setModalShow(true)}>
          <Image src={placeObj.image[1].url_medium} rounded />
          <div className="room-img-name">
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} color="white" />
          </div>
        </div>
        <ItemImages
          images={placeObj.image}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Col>
      <Col md={6}>
        <h5 className="item-title">{placeObj.name}</h5>
        <p className="par-light">
          {placeObj.startDate} - {placeObj.endDate} | &nbsp;
          {placeObj.nights === 1 ? `לילה 1` : `${placeObj.nights} לילות`}
        </p>
        <div dangerouslySetInnerHTML={{ __html: placeObj.summary }}></div>
        <span style={{ color: 'red' }}>{placeObj.errorMessage}</span>
      </Col>
      <Col md={2}>
        <Row className="justify-content-md-center">
          <Col
            md={{ span: '12', order: 'first' }}
            sm={{ span: '4', order: 'last' }}
            xs={{ span: '4', order: 'last' }}
            className="remove-item"
          >
            <button
              className="x-button"
              onClick={() => {
                handleRemoveItem(placeObj.item_id);
              }}
            >
              {xCircleIcon}
            </button>
          </Col>
          <Col>
            <PeopleAmount placeObj={placeObj} />
          </Col>
          <Col md={12} sm={4}>
            <p id="availability">
              {'נותרו '}
              {placeObj.available}
              {' מקומות '}
              {squareCheck}
            </p>
          </Col>
          <Col md={12} sm={4} className="price">
            <div className="bubble">₪{placeObj.rate.total}</div>
            <p>סה"כ</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default CartCard;
