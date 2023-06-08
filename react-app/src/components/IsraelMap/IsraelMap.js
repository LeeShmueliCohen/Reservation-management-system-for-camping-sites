import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import marker from './marker.jpg';
import './IsraelMap.css';
import { useNavigate } from 'react-router-dom';

const markerIcon = L.icon({
  iconUrl: marker,
  iconSize: [30, 30],
});

const IsraelMap = forwardRef(function IsraelMap(props, ref) {
  const { sites, isLoading } = props;
  const navigate = useNavigate();
  const mapViewRef = useRef(null);
  const mapRef = useRef();
  const markersRef = useRef([]);

  useImperativeHandle(ref, () => {
    return {
      zoomIn: (x, y, id) => {
        const marker = markersRef.current.find(
          (marker) =>
            marker.getLatLng().lat === x && marker.getLatLng().lng === y
        );
        if (marker) {
          marker.on('popupopen', () => {
            const popupButton = document.getElementById(id);
            if (popupButton) {
              popupButton.addEventListener('click', (event) => {
                event.stopPropagation();
                const foundSite = sites.find((site) => site._id === id);
                if (foundSite) {
                  navigate(`${foundSite.title.replace(/ /g, '-')}/${id}`);
                } else {
                  console.error(`Site with _id ${id} not found in sites.`);
                }
              });
            }
          });

          marker.openPopup();
          mapRef.current.flyTo([x, y], 12);
        }
      },
    };
  });

  useEffect(() => {
    if (!isLoading) {
      // Create the map instance and set the view
      mapRef.current = L.map(mapViewRef.current).setView(
        [31.811249938383863, 34.771514472163865],
        8
      );

      // Add the OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // create an array to hold all markers
      // const markers = [];

      // loop through the markerList array and create a marker for each item
      sites.forEach((site) => {
        const marker = L.marker([site.xAxis, site.yAxis], { icon: markerIcon })
          .addTo(mapRef.current)
          .bindPopup(
            renderToStaticMarkup(
              <div className="title">
                {site.name} <br />
                <button id={site._id} className="detail-button">
                  פרטים נוספים
                </button>
              </div>
            ),
            {
              offset: [0, -5],
              closeButton: false,
            }
          )
          .on('click', () => {
            mapRef.current.flyTo([site.xAxis, site.yAxis], 12);

            // Add click event listener to button in popup
            const popupButton = document.getElementById(site._id);
            if (popupButton) {
              popupButton.addEventListener('click', (event) => {
                event.stopPropagation();
                navigate(`${site.title.replace(/ /g, '-')}/${site._id}`);
              });
            }
          });

        // markersRef.push(marker);
        markersRef.current.push(marker);
      });

      // console.log(markers);

      // Add click event listener to popup content elements
      const popupContentElements = document.querySelectorAll(
        '.leaflet-popup-content'
      );

      popupContentElements.forEach((popupContentElement) => {
        popupContentElement.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default link behavior
          const link = popupContentElement.querySelector('a');
          if (link) {
            window.location.href = link.href; // Redirect to link URL
          }
        });
      });
    }
  }, [isLoading, sites, navigate]);

  return <div id="israelmap" ref={mapViewRef} className="mapStyles-width" />;
});
export default IsraelMap;
