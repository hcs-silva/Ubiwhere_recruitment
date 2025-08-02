import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.ts";
import quakeDetailsStyles from "../styles/QuakeDetailPage.module.css";
import L from "leaflet";

function QuakeDetailsPage() {
  const { Id } = useParams();
  const [quakeDetails, setQuakeDetails] = useState<QuakeDetails | null>(null);
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const navigate = useNavigate();
  const urlLocation = useLocation();
  interface QuakeDetails {
    id: string;
    location: string;
    magnitude: number;
    date: string;
    coordinates: {
      lat: number;
      long: number;
    };
    timestamp: number;
    depth: number;
  }

  type LeafletMapElement = HTMLElement & { _leaflet_id?: number };

  useEffect(() => {
    try {
      axiosInstance
        .get(`${BACKEND_URL}/earthquakes/${Id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setQuakeDetails(response.data);
        });
    } catch (error) {
      console.error("Error fetching earthquake details:", error);
    }
  }, [Id, BACKEND_URL]);

  useEffect(() => {
    if (!quakeDetails) return;
    const mapElement = L.DomUtil.get("map") as LeafletMapElement;
    if (mapElement?._leaflet_id) {
      mapElement._leaflet_id = undefined;
    }

    const map = L.map("map").setView(
      [quakeDetails.coordinates.lat, quakeDetails.coordinates.long],
      13
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([
      quakeDetails.coordinates.lat,
      quakeDetails.coordinates.long,
    ]).addTo(map);

    marker.bindTooltip(`Location: ${quakeDetails.location}`);

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [quakeDetails]);

  function handleBack() {
    navigate(`/dashboard${urlLocation.search}`, { replace: true });
  }
  return (
    <div className={quakeDetailsStyles.quakeDetails}>
      <h1>Earthquake Detail Page</h1>
      {quakeDetails ? (
        
          <div className={quakeDetailsStyles.mapAndCard}>
            <div className={quakeDetailsStyles.quakeDetailsCard}>
              <h2>Details for Earthquake ID: {quakeDetails.id}</h2>
              <p>
                <strong>Location:</strong> {quakeDetails.location}
              </p>
              <p>
                <strong>Depth:</strong> {quakeDetails.depth.toFixed(5)}
              </p>
              <p>
                <strong>Magnitude:</strong> {quakeDetails.magnitude}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(quakeDetails.timestamp).toDateString()}
              </p>
              <p className={quakeDetailsStyles.coordinateLabels}>
                <strong>Coordinates:</strong>
                <br />
                <strong>Latitude: </strong>
                {`${quakeDetails.coordinates.lat.toFixed(5)}`}{" "}
                <strong>Longitude: </strong>{" "}
                {`${quakeDetails.coordinates.long.toFixed(5)}`}
              </p>
            </div>
            <div id="map" className={quakeDetailsStyles.mapContainer}></div>
          </div>
        
      ) : (
        <p>Loading earthquake details...</p>
      )}
      <button onClick={handleBack} className={quakeDetailsStyles.backButton}>
        Back to Map
      </button>
    </div>
  );
}
export default QuakeDetailsPage;
