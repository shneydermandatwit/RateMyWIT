import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const initMap = () => {
      const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(42.33436995317759, -71.09884163233488), // Southwest corner of the bounding box
        new google.maps.LatLng(42.33854320333202, -71.09085283322084)  // Northeast corner of the bounding box
      );
    
      const newMap = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 42.33612470204511, lng: -71.09531573419756 },
        zoom: 18,
        mapId: 'f46081d6aab889bc',
        mapTypeId: 'satellite',
        mapTypeControl: false,
        fullscreenControl: false,
        tilt: 20,
        restriction: {
          latLngBounds: bounds,
          strictBounds: true
        }
      });
      setMap(newMap);
    };

    const fetchMarkers = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/marker/`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (window.google) {
      initMap();
      fetchMarkers();
    } else {
      console.error('Error loading Google Maps API.');
    }
  }, []);

  useEffect(() => {
    if (map && data.length > 0) {
      data.forEach((marker) => {
        const popupContent = `<div id=popup><h1>${marker.building}</h1></div>`;
        const mapMarker = new google.maps.Marker({
          position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lon) },
          map: map,
          title: marker.building,
        });

        const infowindow = new google.maps.InfoWindow({
          content: popupContent,
        });

        mapMarker.addListener('mouseover', () => {
          infowindow.open(map, mapMarker);
        });

        mapMarker.addListener('mouseout', () => {
          infowindow.close();
        });

        mapMarker.addListener('click', () => {
          navigate('/review', { state: { buildingParam: marker.building } });
        });
      });
    }
  }, [map, data, navigate]); // Include navigate in the dependency array

  return <div id="map" style={{ width: '90%', height: '90%', margin: 'auto' }}></div>;
};

export default MapComponent;
