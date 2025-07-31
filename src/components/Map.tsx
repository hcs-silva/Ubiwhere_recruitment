import L from "leaflet";
import { useEffect } from "react";


function Map() {
    
  useEffect(() => {

    //check if the map container exists,and if it does do not create another instance
    if((L.DomUtil.get("map") as any)?._leaflet_id){
        (L.DomUtil.get("map") as any)._leaflet_id = null; // reset the id to allow reinitialization
    }
    const map = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    //map cleanup on unmount
    return () => {
      map.remove();
    }
  }, []);

  return <div id="map"></div>;
}

export default Map;
