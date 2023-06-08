import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './FindSitesByDate.css';
import { calculateTommorowDate, pullTodayDate } from '../../../utils/dateUtils';
import FindSitesPeopleCount from './FindSitesPeopleCount';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

function FindSitesByDate({ setDates, peoplesProps }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const today = pullTodayDate();
  const tomorrow = calculateTommorowDate(today);

  const [arrivalDate, setArrivalDate] = useState(
    searchParams.get('start_date') || today
  );
  const [departureDate, setDepartureDate] = useState(
    searchParams.get('end_date') || tomorrow
  );
  const [peoples, setPeoples] = useState(peoplesProps.peoples);

  const handleSubmit = () => {
    setDates({ startDate: arrivalDate, endDate: departureDate });
    peoplesProps.setPeoples({
      adults: peoples.adults,
      children: peoples.children,
      toddlers: peoples.toddlers,
    });

    // Update the URL
    navigate(
      `${location.pathname}?start_date=${arrivalDate}&end_date=${departureDate}&adults=${peoples.adults}&children=${peoples.children}&toddlers=${peoples.toddlers}`
    );
  };

  const handleReset = () => {
    setArrivalDate(today);
    setDepartureDate(tomorrow);
    setPeoples({
      adults: 1,
      children: 0,
      toddlers: 0,
    });
    peoplesProps.setPeoples(peoples);
    navigate(`${location.pathname}`, { replace: true });
  };
  const startDateOnChange = (e) => {
    setArrivalDate(e.target.value);
    setDepartureDate(calculateTommorowDate(e.target.value));
  };
  return (
    <Container className="wrapper">
      <Row>
        {/* <Col className="find-sites-label" xl="auto" md="12">
          <strong>מצא תאריכים</strong>
        </Col> */}
        <Col xs="12" md="auto" id="datesLabelCol">
          <div className="datesLabel">
            <label htmlFor="arrival">הגעה: &nbsp; </label>
            <input
              className="datePicker"
              type="date"
              id="arrival"
              value={arrivalDate}
              min={today}
              onChange={startDateOnChange}
            />
          </div>
          <div className="datesLabel">
            <label htmlFor="departure">עזיבה: &nbsp; </label>
            <input
              className="datePicker"
              type="date"
              id="departure"
              value={departureDate}
              min={tomorrow}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
        </Col>
        <Col>
          <FindSitesPeopleCount peoplesProps={{ peoples, setPeoples }} />
        </Col>
        <Col sm="12" md="auto" className="center-button">
          <button className="primary-button" onClick={handleSubmit}>
            מצא זמינות
          </button>
          <button className="primary-button" onClick={handleReset}>
            איפוס
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default FindSitesByDate;
