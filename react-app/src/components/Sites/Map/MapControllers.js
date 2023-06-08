import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareCaretUp,
  faSquareCaretDown,
  faSquareCaretLeft,
  faSquareCaretRight,
  faSquareMinus,
  faSquarePlus,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import './MapControllers.css';

function MapControllers({ scale, panZoomRef }) {
  // icons
  const upIcon = (
    <FontAwesomeIcon icon={faSquareCaretUp} size="2xl" className="arrow" />
  );
  const downIcon = (
    <FontAwesomeIcon icon={faSquareCaretDown} size="2xl" className="arrow" />
  );
  const leftIcon = (
    <FontAwesomeIcon icon={faSquareCaretLeft} size="2xl" className="arrow" />
  );
  const rightIcon = (
    <FontAwesomeIcon icon={faSquareCaretRight} size="2xl" className="arrow" />
  );

  // const scaleToShow = `${Math.round(scale.toFixed(2) * 100)}%`;

  const handleZoomReset = () => {
    if (panZoomRef.current) {
      panZoomRef.current.autoCenter(1.001);
    }
  };

  const handleZoomIn = () => {
    if (panZoomRef.current) {
      const newScale = scale + 0.2;
      panZoomRef.current.autoCenter(newScale);
    }
  };

  const handleZoomOut = () => {
    if (panZoomRef.current) {
      const newScale = scale - 0.2;
      panZoomRef.current.autoCenter(newScale);
    }
  };

  const handleLeft = () => {
    if (panZoomRef.current) {
      panZoomRef.current.moveByRatio(1, 0);
    }
  };
  const handleRight = () => {
    if (panZoomRef.current) {
      panZoomRef.current.moveByRatio(-1, 0);
    }
  };
  const handleUp = () => {
    if (panZoomRef.current) {
      panZoomRef.current.moveByRatio(0, 0.5);
    }
  };
  const handleBottom = () => {
    if (panZoomRef.current) {
      panZoomRef.current.moveByRatio(0, -0.5);
    }
  };

  return (
    <div className="MapControllers control">
      <div>
        <button className="icon-btn" onClick={handleZoomReset}>
          {/* איפוס */}
          <FontAwesomeIcon icon={faLocationCrosshairs} className="reset" />
        </button>
        &nbsp;
        <button onClick={handleZoomIn} className="icon-btn">
          <FontAwesomeIcon icon={faSquarePlus} className="zoom" />
        </button>
        &nbsp;
        {/* {scaleToShow} */}
        {/* &nbsp; */}
        <button className="icon-btn" onClick={handleZoomOut}>
          <FontAwesomeIcon icon={faSquareMinus} className="zoom" />
        </button>
      </div>

      <table>
        <tbody>
          <tr>
            <td />
            <td>
              <button onClick={handleUp} className="icon-btn">
                {upIcon}
              </button>
            </td>
            <td />
          </tr>
          <tr>
            <td>
              <button onClick={handleRight} className="icon-btn">
                {rightIcon}
              </button>
            </td>
            <td />
            <td>
              <button onClick={handleLeft} className="icon-btn">
                {leftIcon}
              </button>
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <button onClick={handleBottom} className="icon-btn">
                {downIcon}
              </button>
            </td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MapControllers;
