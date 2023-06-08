import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function usePlacesData(siteId, dates, peoples) {
  const [placesData, setPlacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPlaces = useCallback(async () => {
    if (!dates.startDate || !dates.endDate) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/places/${siteId}?startDate=${dates.startDate}&endDate=${dates.endDate}&adult=${peoples.adults}&child=${peoples.children}&toddler=${peoples.toddlers}`
      );
      const data = await response.json();
      if (data.length === 0) {
        throw new Error('No data found');
      } else {
        setPlacesData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      navigate(`/notfound?res=${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [dates, navigate, peoples, siteId]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return {
    placesData,
    setPlacesData,
    isLoading,
    setIsLoading,
  };
}

export default usePlacesData;
