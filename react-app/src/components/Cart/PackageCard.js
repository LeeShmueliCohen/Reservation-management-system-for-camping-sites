import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  changePackageOption,
  changePackageOptionOld,
  changePackageAmount,
} from '../../store/cart-actions';

function PackageCard({ packageObj }) {
  const dispatch = useDispatch();

  const handleChangeAmount = (obj) => {
    if (obj.guest === 0 || obj.opt === 'optout') {
      dispatch(changePackageOption(obj.key, 'optout'));
    } else if (obj.guest > 0 || obj.opt === 'optin') {
      dispatch(changePackageAmount(obj));
    }
  };

  const handleChangePacakge = (key, opt) => {
    if (opt === 'out') {
      dispatch(changePackageOptionOld(key, 'optin'));
    } else {
      dispatch(changePackageOptionOld(key, 'optout'));
    }
  };

  return (
    <Row style={{ marginBottom: '1rem' }}>
      <Col xs={3} style={{ paddingRight: '5%' }}>
        <h6 className="item-title">{packageObj.name}</h6>
      </Col>
      <Col>
        <span>₪{packageObj.rate.price}</span>
      </Col>
      {packageObj.sku.includes('electricity-water') ? (
        <Col>
          <button
            className={
              packageObj.opt === 'out' ? 'third-button' : 'fourth-button'
            }
            style={{ padding: '2px 4px' }}
            onClick={() => {
              handleChangePacakge(packageObj.key, packageObj.opt);
            }}
          >
            {packageObj.opt === 'out' ? 'הוסף' : 'הסר'}
          </button>
        </Col>
      ) : (
        <Col>
          <button
            className="third-button add-people"
            onClick={() => {
              handleChangeAmount({
                key: packageObj.key,
                slip: packageObj.slip,
                guest: packageObj.guest + 1,
                available: packageObj.available,
              });
            }}
          >
            +
          </button>
          <span>{packageObj.guest}</span>
          <button
            className="third-button add-people"
            onClick={() => {
              handleChangeAmount({
                key: packageObj.key,
                slip: packageObj.slip,
                guest: packageObj.guest - 1,
              });
            }}
          >
            -
          </button>
        </Col>
      )}

      <Col>
        <span>₪{packageObj.rate.total}</span>
      </Col>
    </Row>
  );
}
export default PackageCard;
