import L from "leaflet";
import { useEffect } from "react";
import style from "../styles/Map.module.css"


function Map() {
    type LeafletMapElement = HTMLElement & { _leaflet_id?: number };

  useEffect(() => {

    //check if the map container exists,and if it does do not create another instance

    const mapElement = L.DomUtil.get("map") as LeafletMapElement;
    if (mapElement?._leaflet_id) {
        mapElement._leaflet_id = undefined; // or null
    }
    // if((L.DomUtil.get("map") as any)?._leaflet_id){
    //     (L.DomUtil.get("map") as any)._leaflet_id = null; // reset the id to allow reinitialization
    // }
    const map = L.map("map").setView([40.64427, -8.64554], 13);

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

  return <div id="map" className={style.map}></div>;
}

export default Map;
