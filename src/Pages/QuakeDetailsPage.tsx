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
  console.log(quakeDetails);

  function handleBack() {
    navigate(`/dashboard${urlLocation.search}`, { replace: true });
  }
  return (
    <div>
      <h1>QuakeDetailsPage</h1>
      {quakeDetails ? (
        <div>
          <h2>Details for Earthquake ID: {quakeDetails.id}</h2>
          <p>Location: {quakeDetails.location}</p>
          <p>Magnitude: {quakeDetails.magnitude}</p>
          <p>Date: {new Date(quakeDetails.date).toLocaleString()}</p>
          <p>
            Coordinates:{" "}
            {`Latitude: ${quakeDetails.coordinates.lat}, Longitude: ${quakeDetails.coordinates.long}`}
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
