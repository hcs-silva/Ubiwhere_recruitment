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
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 10;
  const MAX_PAGES = 5;

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

  // Sync state from URL query parameters on mount and when URL changes
  useEffect(() => {
    const params = new URLSearchParams(urlLocation.search);
    const urlStartDate = params.get("startDate") || "";
    const urlEndDate = params.get("endDate") || "";
    const urlPage = Number(params.get("page")) || 1;

    setStartDate(urlStartDate);
    setEndDate(urlEndDate);
    setPage(urlPage);
  }, [urlLocation.search]);

  // The fetch function is memoized to avoid unnecessary recreations
  const fetchEarthquakes = useCallback(
    async (myPage = 1, myStart = "", myEnd = "") => {
      try {
        const offset = (myPage - 1) * ITEMS_PER_PAGE;

        const response = await axiosInstance.get(`/earthquakes`, {
          params: {
            limit: ITEMS_PER_PAGE,
            offset,
            startDate: myStart || undefined,
            endDate: myEnd || undefined,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        });

        const params = new URLSearchParams();
        if (myStart) params.append("startDate", myStart);
        if (myEnd) params.append("endDate", myEnd);
        params.append("limit", ITEMS_PER_PAGE.toString());
        params.append("offset", offset.toString());
        params.append("page", myPage.toString());

        navigate(`/dashboard?${params.toString()}`, { replace: true });
        setEarthquakes(response.data);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      }
    },
    [navigate]
  );

  // Fetch earthquakes whenever page, startDate, or endDate changes (via URL sync)
  useEffect(() => {
    // Only fetch if startDate or endDate is set or page param exists in URL
    if (startDate || endDate || urlLocation.search.includes("page=")) {
      fetchEarthquakes(page, startDate, endDate);
    } else {
      // If no filters or page in URL, clear earthquakes on fresh load
      setEarthquakes([]);
    }
  }, [page, startDate, endDate, urlLocation.search, fetchEarthquakes]);

  // Handle form submit triggers page reset and URL updates via effect
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPage(1);
  }

  // Handle page changes via pagination controls
  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= MAX_PAGES) {
      setPage(newPage);
    }
  }

  // Clear search inputs and reset URL & state without reloading
  function handleClearSearch() {
    setStartDate("");
    setEndDate("");
    setPage(1);
    setEarthquakes([]);
    navigate("/dashboard", { replace: true });
  }

  // Leaflet map setup and markers rendering
  useEffect(() => {
    const mapElement = L.DomUtil.get("map") as LeafletMapElement;
    if (mapElement?._leaflet_id) {
      mapElement._leaflet_id = undefined;
    }

    const map = L.map("map").setView([40.64427, -8.64554], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Add fixed marker for "Ubiwhere"
    const staticMarker = L.marker([40.64687, -8.64321]).addTo(map);
    staticMarker.bindTooltip("Ubiwhere");

    // Add earthquake markers
    earthquakes.forEach((quake: Quake) => {
      const { coordinates, location, id } = quake;
      const marker = L.marker([coordinates.lat, coordinates.long]).addTo(map);
      marker
        .bindTooltip(`Location: ${location}`)
        .on("click", () => {
          // Navigate to details with current URL search params to preserve state
          navigate(`/earthquake/details/${id}${urlLocation.search}`);
        });
    });
    
    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [earthquakes, navigate, urlLocation.search]);

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

      {earthquakes.length > 0 && (
        <div className="pagination">
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
        </div>
      )}

      <button onClick={handleClearSearch}>Clear Search</button>
    </>
  );
}

export default Map;
