import { useCallback, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import IsraelMap from '../IsraelMap/IsraelMap';
import Legend from '../IsraelMap/Legend';
import nature from './nature.png';

function Home() {
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const mapRef = useRef();

  const fetchSites = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/sites`);

      const data = await response.json();
      setSites(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      navigate(`/notfound?res=${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const clickHandler = (x, y, id) => {
    mapRef.current.zoomIn(x, y, id);
  };

  return (
    <div className="Body">
      <img src={nature} alt="nature" />
      <h1 className="green-title">
        נשמח לארח אתכם ברשת חניוני הלילה של רשות הטבע והגנים !
      </h1>
      <h3>
        להזמנת לינה בחניוני הלילה - <b>לחצו על חניון הלילה המבוקש 👇🏼 </b>
      </h3>

      <div className="flex-container">
        <Legend sites={sites} onClick={clickHandler} isLoading={isLoading} />
        <IsraelMap sites={sites} isLoading={isLoading} ref={mapRef} />
      </div>
    </div>
  );
}

export default Home;
