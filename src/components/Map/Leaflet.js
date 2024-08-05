import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvent,
  Popup,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import classes from "./Leaflet.module.css";
import { useEffect } from "react";
import maps from "../Data/Maps";
import georgia from "../../assets/mygeodata/georgia.json";

function Leaflet(props) {
  const icon = L.icon({
    iconUrl: props.icon,
    iconSize: [50, 50],
    iconAnchor: [15, 20], //width, height
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  function LocationMarker({ location }) {
    const map = useMapEvent({
      move() {},
    });
    useEffect(() => {
      if (location) {
        map.flyTo(location, 9);
      }
    }, [location, map]);
    return null;
  }

  return (
    <div className={classes.main}>
      {/* This map shows shapefile and retrievs users location */}
      <div className={classes.map}>
        <MapContainer
          center={props.center}
          zoom={props.zoom}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution={maps.maptiler.attribution}
            url={maps.maptiler.url}
            maxZoom={20}
          />

          <Marker position={props.marker} icon={icon}>
            <Popup>{props.popup}</Popup>
          </Marker>
          <LocationMarker location={props.location} />

          <GeoJSON data={georgia}></GeoJSON>
        </MapContainer>
      </div>
    </div>
  );
}

export default Leaflet;
