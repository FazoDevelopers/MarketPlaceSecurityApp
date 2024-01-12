import { MapContainer, TileLayer } from "react-leaflet";
import { MAP_CONFIG } from "../utils/constants";
import "./MainStyle.css";
import { GetCoordinates } from "../utils/globals";

const ClickableMap = () => {
  return (
    <MapContainer
      className={"center-of-map"}
      center={MAP_CONFIG?.center}
      zoom={MAP_CONFIG?.maxZoom}
      scrollWheelZoom={MAP_CONFIG?.scrollWheelZoom}
      zoomControl={MAP_CONFIG?.zoomControl}
    >
      <TileLayer {...MAP_CONFIG?.tileLayer} />
      <GetCoordinates />
    </MapContainer>
  );
};

export default ClickableMap;
