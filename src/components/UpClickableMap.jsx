import React, { useEffect } from "react";
import { MapContainer, useMap, TileLayer } from "react-leaflet";
import "./MainStyle.css";
import { useRecoilState } from "recoil";
import { latState, lngState } from "../recoil/atoms";

const tileLayer = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const GetCoordinates = () => {
  const map = useMap();
  const [lat, setLat] = useRecoilState(latState);
  const [lng, setLng] = useRecoilState(lngState);

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

const ClickableMap = ({ upCameraData }) => {
  return (
    <MapContainer
      className={"center-of-map"}
      center={[upCameraData.latitude, upCameraData.longitude]}
      zoom={18}
      scrollWheelZoom={false}
    >
      <TileLayer {...tileLayer} />

      <GetCoordinates />
    </MapContainer>
  );
};

export default ClickableMap;
