import L from "leaflet";
import { useContext, useEffect, useState } from "react";
import style from "../styles/Map.module.css";
import { AuthContext } from "../contexts/AuthContext.tsx";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function Map() {
  const [earthquakes, setEarthquakes] = useState([]);
  type LeafletMapElement = HTMLElement & { _leaflet_id?: number };

  interface Quake {
    coordinates: {lat: number, long:number};
  }

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthWrapper");
  }

  const { getAuthConfig } = authContext;

  useEffect(() => {
    //Check if the map container exists,and if it does do not create another instance

    const mapElement = L.DomUtil.get("map") as LeafletMapElement;
    if (mapElement?._leaflet_id) {
      mapElement._leaflet_id = undefined; // or null
    }
    // Initialize the map
    const map = L.map("map").setView([40.64427, -8.64554], 13);

   
    //Add markers
    const marker = L.marker([40.64427, -8.64554]).addTo(map);
    marker.bindTooltip("Test Marker").openTooltip();

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    earthquakes.forEach((quake: Quake) => {
      const { coordinates } = quake;  
      const marker = L.marker([coordinates.lat, coordinates.long]).addTo(map);
      marker.bindTooltip(`Latitude:${coordinates.lat},Longitude ${coordinates.long}`).openTooltip();
      });

   
    
    //Map cleanup on unmount
    return () => {
      map.remove();
    };
  }, [earthquakes]);

  useEffect(()=> {
     // Fetch earthquake data from the backend
    const fetchEarthquakes = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/earthquakes`,
          getAuthConfig()
        );
        
        setEarthquakes(response.data);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      }
    };

    fetchEarthquakes();

    
  }, [getAuthConfig])

 
  //TODO: add one marker to the map for testing purposes and then loop through the earthquakes array to add markers for each earthquake
  //TODO: Complete reading the documentation on the leaflet library to understand how to add markers and popups



  return <div id="map" className={style.map}></div>;
}

export default Map;
