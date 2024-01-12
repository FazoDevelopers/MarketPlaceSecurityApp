import PropTypes from "prop-types";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useRecoilState } from "recoil";
import { latState, lngState } from "../recoil/atoms";
import { MAP_CONFIG } from "../utils/constants";
import { GetCoordinates } from "../utils/globals";
import "./MainStyle.css";

const ClickableMap = ({ upCameraData }) => {
  const map = useMap();
  const [, setLat] = useRecoilState(latState);
  const [, setLng] = useRecoilState(lngState);
  return (
    <MapContainer
      className={"center-of-map"}
      center={[upCameraData.latitude, upCameraData.longitude]}
      zoom={MAP_CONFIG?.zoom}
      scrollWheelZoom={MAP_CONFIG?.scrollWheelZoom}
    >
      <TileLayer {...MAP_CONFIG.tileLayer} />
      <GetCoordinates map={map} setLat={setLat} setLng={setLng} />
    </MapContainer>
  );
};

export default ClickableMap;
ClickableMap.propTypes = {
  upCameraData: PropTypes.object.isRequired,
};