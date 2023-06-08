import { useState } from 'react';
import './Sites.css';
import FindSitesByDate from './FindSitesByDate/FindSitesByDate';
import MapWithPlaces from './Map/MapWithPlaces';
import { Spinner } from 'react-bootstrap';
import { calculateTommorowDate, pullTodayDate } from '../../utils/dateUtils';
import fetchPlacesApi from '../../utils/fetchPlacesApi';
import { useParams, useSearchParams } from 'react-router-dom';
import useSiteDetails from '../../utils/useSitesApi';
import MiniCartMobile from '../Cart/MiniCartMobile';
import ProcessStep from './ProcessStep';

function Sites() {
  const [searchParams] = useSearchParams();

  const { campingName, siteId } = useParams();
  const { siteDetails, isLoadingSiteDetails } = useSiteDetails(siteId);

  const [dates, setDates] = useState({
    startDate: searchParams.get('start_date') || pullTodayDate(),
    endDate:
      searchParams.get('end_date') || calculateTommorowDate(pullTodayDate()),
  });

  const [peoples, setPeoples] = useState({
    adults: Number(searchParams.get('adults')) || 1,
    children: Number(searchParams.get('children')) || 0,
    toddlers: Number(searchParams.get('toddlers')) || 0,
  });

  const { placesData, isLoading } = fetchPlacesApi(siteId, dates, peoples);

  return (
    <div className="sites">
      <ProcessStep currentStep={"0"} />
      <div
        id="siteImg"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${siteDetails.image_url})`,
        }}
      >
        <h1 className="title">{siteDetails.title}</h1>
      </div>
      <FindSitesByDate
        setDates={setDates}
        peoplesProps={{ peoples, setPeoples }}
      />

      <div className={`innerWrap ${isLoading ? 'loading' : ''}`}>
        {isLoading && isLoadingSiteDetails && (
          <div className="spinner-container">
            <Spinner animation="border" />
          </div>
        )}

        <MapWithPlaces mapName={campingName} placesData={placesData} />
        <MiniCartMobile />
      </div>
    </div>
  );
}

export default Sites;
