import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function QuakeDetailsPage() {
  const { Id } = useParams();
  const [quakeDetails, setQuakeDetails] = useState<QuakeDetails|null>(null);
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const navigate = useNavigate();
    interface QuakeDetails {
    id: string;
    location: string;
    magnitude: number;
    date: string;
    coordinates: {
      lat: number;
      long: number;
    },
  }


  useEffect(() => {
    try {
     axios.get(`${BACKEND_URL}/earthquakes/${Id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {setQuakeDetails(response.data);});
      
    } catch (error) {
      console.error("Error fetching earthquake details:", error);
    }
  }, [Id, BACKEND_URL]);
  console.log("Quake Details:", quakeDetails);

  function handleBack() {
    navigate("/dashboard");
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
          <p>Coordinates: {`Latitude: ${quakeDetails.coordinates.lat}, Longitude: ${quakeDetails.coordinates.long}`}</p>
        </div>
      ) : (
        <p>Loading earthquake details...</p>
      )}
      <button onClick={handleBack}>Back</button>
    </div>
  );
}
export default QuakeDetailsPage;
