import L from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import style from "../styles/Map.module.css";
import { AuthContext } from "../contexts/AuthContext.tsx";
import axios from "axios";
import { useNavigate} from "react-router-dom";    

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function Map() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const Navigate = useNavigate(); 
  type LeafletMapElement = HTMLElement & { _leaflet_id?: number };

  interface Quake {
    coordinates: { lat: number; long: number };
    location: string;
    id: string;
  }

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthWrapper");
  }

  

  useEffect(() => {
    //Check if the map container exists,and if it does do not create another instance

    const mapElement = L.DomUtil.get("map") as LeafletMapElement;
    if (mapElement?._leaflet_id) {
      mapElement._leaflet_id = undefined; // or null
    }
    // Initialize the map
    const map = L.map("map").setView([40.64427, -8.64554], 13);

    //Add markers
    const marker = L.marker([40.64687, -8.64321]).addTo(map);
    marker.bindTooltip("Ubiwhere");

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    earthquakes.forEach((quake: Quake) => {
      const { coordinates, location, id } = quake;
      const marker = L.marker([coordinates.lat, coordinates.long]).addTo(map);
      marker
        .bindTooltip(
          `Location:${location}`
        ).on("click", () => {
          Navigate(`/earthquake/details/${id}`);
        });
    });

    //Map cleanup on unmount
    return () => {
      map.remove();
    };
  }, [earthquakes, Navigate]);

 
    // Fetch earthquake data from the backend
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      try {
        const response = await axios.get(
          `${BACKEND_URL}/earthquakes`
          ,
          {
            params: {
              limit: 10,
              page: 1,
              startDate: startDate || undefined,
              endDate: endDate || undefined,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json',
            }
          }
        );
        console.log("Response data:", response.data);
        setEarthquakes(response.data);

      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      }
    };

 

  


  return (
    <>
      <div id="map" className={style.map}></div>
      <form className="queries" onSubmit={handleSubmit}>
        <label>
          Start Date (YYYY-MM-DD):
          <input type="text" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
        </label>
        <label>
          End Date (YYYY-MM-DD):
          <input type="text" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
        </label>
        <button type="submit" className="submit">Search</button>
      </form>
    </>
  );
}

export default Map;
