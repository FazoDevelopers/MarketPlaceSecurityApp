import PropTypes from "prop-types";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useRecoilState } from "recoil";
import { latState, lngState } from "../recoil/atoms";
import { MAP_CONFIG } from "../utils/constants";
import "./MainStyle.css";

const GetCoordinates = () => {
  const map = useMap();
  const [, setLat] = useRecoilState(latState);
  const [, setLng] = useRecoilState(lngState);
  useEffect(() => {
    if (!map) return;
    map.on("moveend", () => {
      const { lat, lng } = map.getCenter();
      setLat(lat);
      setLng(lng);
    });
  }, [map, setLat, setLng]);

  return null;
};

const ClickableMap = ({ upCameraData }) => {
  return (
    <MapContainer
      className={"center-of-map"}
      center={[upCameraData.latitude, upCameraData.longitude]}
      zoom={MAP_CONFIG?.zoom}
      scrollWheelZoom={MAP_CONFIG?.scrollWheelZoom}
    >
      <TileLayer {...MAP_CONFIG.tileLayer} />

      <GetCoordinates />
    </MapContainer>
  );
};

export default ClickableMap;

ClickableMap.propTypes = {
  upCameraData: PropTypes.object.isRequired,
};
