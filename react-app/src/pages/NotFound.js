import { useLocation } from "react-router-dom";
import { faFaceFrownOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

function NotFound() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const res = searchParams.get("res");
  console.log(res);
  
  return (
    <div style={{ textAlign: "center", marginTop: "3rem", marginBottom: "25rem" }}>
      <h1 style={{ marginBottom: "3rem" }}>
        {<FontAwesomeIcon icon={faFaceFrownOpen} />}&nbsp;
        Oops! something went wrong
      </h1>

      <Link to="/" className="primary-button button-hover-white">
        <b> חזרה לדף הראשי</b>
      </Link>

    </div>
  );
}

export default NotFound;
