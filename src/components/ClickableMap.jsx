import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useRecoilState } from "recoil";
import { latState, lngState } from "../recoil/atoms";
import "./MainStyle.css";

const center = [40.996289671996706, 3671.640515327454];

const tileLayer = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

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
  }, [map]);

  return null;
};

const ClickableMap = () => {
  return (
    <MapContainer
      className={"center-of-map"}
      center={center}
      zoom={18}
      scrollWheelZoom={false}
    >
      <TileLayer {...tileLayer} />

      <GetCoordinates />
    </MapContainer>
  );
};

export default ClickableMap;
