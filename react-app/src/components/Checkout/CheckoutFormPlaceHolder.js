import { Placeholder, Row, Col } from 'react-bootstrap';

function CheckoutFormPlaceHolder() {
  const labelFields = 'span';
  const inputField = 'h4';
  return (
    <>
      <div className="card-item" style={{ width: '100%', height: '347.9px' }}>
        <div style={{ padding: '1rem' }}>
          <h2>פרטים אישיים</h2>
          <Placeholder as={labelFields} animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
          <Placeholder as={inputField} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
          <Placeholder as={labelFields} animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
          <Placeholder as={inputField} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
          <Placeholder as={labelFields} animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
          <Placeholder as={inputField} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
          <Placeholder as={labelFields} animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
          <Placeholder as={inputField} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </div>
      </div>
      <div className="card-item" style={{ width: '324px', height: '347.9px' }}>
        <div style={{ padding: '1rem' }}>
          <h2>תשלום</h2>
          <Placeholder as={labelFields} animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
          <Placeholder as={inputField} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
          <Placeholder as={labelFields} animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
          <Placeholder as={labelFields} animation="glow">
            <Row>
              <Col>
                <Placeholder xs={12} />
              </Col>
              <Col>
                <Placeholder xs={12} />
              </Col>
            </Row>
          </Placeholder>
          <Placeholder as={inputField} animation="glow">
            <Row>
              <Col>
                <Placeholder xs={12} />
              </Col>
              <Col>
                <Placeholder xs={12} />
              </Col>
            </Row>
          </Placeholder>
          <Placeholder as={labelFields} animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
          <Placeholder as={inputField} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </div>
      </div>
    </>
  );
}
export default CheckoutFormPlaceHolder;
