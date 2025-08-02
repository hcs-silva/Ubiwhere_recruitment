import L from "leaflet";
import React, { useCallback, useContext, useEffect, useState } from "react";
import style from "../styles/Map.module.css";
import { AuthContext } from "../contexts/AuthContext.tsx";
import axiosInstance from "../api/axiosInstance.ts";
import { useLocation, useNavigate } from "react-router-dom";

function Map() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  
const urlLocation = useLocation();
  const Items_Per_Page = 10; 
  const offset = (page - 1) * Items_Per_Page; // Assuming 10 items per page
  const MAX_PAGES = 5; // Assuming a maximum of 5 pages for pagination
  const navigate = useNavigate();
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
      marker.bindTooltip(`Location:${location}`).on("click", () => {
        navigate(`/earthquake/details/${id}${urlLocation.search}`);
      });
    });

    //Map cleanup on unmount
    return () => {
      map.remove();
    };
  }, [earthquakes, navigate, urlLocation.search]);

  

  // Fetch earthquake data from the backend
  const fetchEarthquakes = useCallback(async (myPage = page, myStart = startDate, myEnd = endDate)  => {
    try {
      const response = await axiosInstance.get(`/earthquakes`, {
        params: {
          limit: Items_Per_Page,
          page: myPage,
          offset,
          startDate: myStart || undefined,
          endDate: myEnd || undefined,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Response data:", response.data);
      const params = new URLSearchParams();
      params.append("startDate", startDate);
      params.append("endDate", endDate);
      params.append("limit", "10");
      params.append("offset", offset.toString());
      params.append("page", page.toString());
      navigate(`/dashboard?${params.toString()}`, { replace: true });
      setEarthquakes(response.data);
    } catch (error) {
      console.error("Error fetching earthquake data:", error);
    }
  }, [page, startDate, endDate, offset, navigate]);

 useEffect(() => {
  if (startDate || endDate || urlLocation.search.includes("page=")) {
    fetchEarthquakes(page, startDate, endDate);
  }
}, [urlLocation.search, startDate, endDate, page, fetchEarthquakes]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPage(1); // Reset to the first page on new search
    fetchEarthquakes(1, startDate, endDate);
  }

  function handlePageChange(newPage: number) {
  setPage(newPage);
  fetchEarthquakes(newPage, startDate, endDate);
}

  function handleClearSearch(){
    setStartDate("");
    setEndDate("");
    setPage(1);
    setEarthquakes([]);
    navigate("/dashboard");
  }

  return (
    <>
      <div id="map" className={style.map}></div>
      <form className="queries" onSubmit={handleSubmit}>
        <label>
          Start Date (YYYY-MM-DD):
          <input
            type="text"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date (YYYY-MM-DD):
          <input
            type="text"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button type="submit" className="submit">
          Search
        </button>
      </form>
      {earthquakes.length > 0 &&(<div className="pagination">
        <button
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          ◀ Previous
        </button>

        <span>
          Página {page} de {MAX_PAGES}
        </span>

        <button
          onClick={() => handlePageChange(Math.min(page + 1, MAX_PAGES))}
          disabled={page === MAX_PAGES}
        >
          Next ▶
        </button>
      </div>)}
      <button onClick={handleClearSearch}>Clear Search</button>
    </>
  );
}

export default Map;
