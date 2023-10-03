import React, { useEffect } from "react";
import { MapContainer, useMap, TileLayer } from "react-leaflet";
import L from "leaflet";

const center = [52.22977, 21.01178];

const tileLayer = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
import "./MainStyle.css";

const GetCoordinates = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: "bottomleft" });

    const div = L.DomUtil.create("div", "legend");

    legend.onAdd = () => {
      const { lat, lng } = map.getCenter();
      const zoom = map.getZoom();

      L.DomEvent.disableClickPropagation(div);

      div.innerHTML = `center: ${lat.toFixed(5)}, ${lng.toFixed(
        5
      )} | zoom: ${zoom}`;

      return div;
    };

    legend.addTo(map);

    map.on("dragend zoomend", () => {
      const { lat, lng } = map.getCenter();
      const zoom = map.getZoom();
      div.innerHTML = `center: ${lat.toFixed(5)}, ${lng.toFixed(
        5
      )} | zoom: ${zoom}`;
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
