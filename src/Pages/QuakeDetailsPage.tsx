import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.ts";

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
  console.log("Quake Details:", quakeDetails);

  function handleBack() {
    navigate(`/dashboard${urlLocation.search}`, { replace: true });
  }
  return (
    <div>
      <h1>Earthquake Detail Page</h1>
      {quakeDetails ? (
        <div className="quake-details">
          <h2>Details for Earthquake ID: {quakeDetails.id}</h2>
          <p>Location: {quakeDetails.location}</p>
          <p>Depth: {(quakeDetails.depth).toFixed(5)}</p>
          <p>Magnitude: {quakeDetails.magnitude}</p>
          <p>Date: {new Date(quakeDetails.timestamp).toDateString()}</p>
          <p>
            Coordinates:{" "}
            {`Latitude: ${quakeDetails.coordinates.lat.toFixed(5)}, Longitude: ${(quakeDetails.coordinates.long).toFixed(5)}`}
          </p>
        </div>
      ) : (
        <p>Loading earthquake details...</p>
      )}
      <button onClick={handleBack}>Back to Map</button>
    </div>
  );
}
export default QuakeDetailsPage;
