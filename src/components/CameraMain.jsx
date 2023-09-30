import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MainStyle.css";
import CriminalCard from "./CriminalCard";
import DetectHumanCard from "./DetectHumanCard";

function SetViewOnClick({ coords, zoomCustom }) {
  const map = useMap();

  useEffect(() => {
    if (coords && coords.length === 2) {
      setTimeout(() => {
        map.flyTo(coords, zoomCustom);
      }, 100);
    }
  }, [coords, zoomCustom, map]);

  return null;
}

function CameraMain() {
  const [centerPositions, setCenterPositions] = useState([
    40.99681833333333, 71.64040666666666,
  ]);
  const [zoomCustom, setZoom] = useState(12);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

  const [positions, setPositions] = useState([
    {
      cam_id: "id_1",
      location: [40.99681833333333, 71.64040666666666],
      name: "Location 1",
      address: "Address 1",
      photo: "https://picsum.photos/id/100/50/50",
      humanDetected: true,
    },
    {
      cam_id: "id_2",
      location: [41.09681833333333, 71.74040666666666],
      name: "Location 2",
      address: "Address 2",
      photo: "https://picsum.photos/id/101/50/50",
      humanDetected: false,
    },
    {
      cam_id: "id_3",
      location: [41.19681833333333, 71.8404666666666],
      name: "Location 3",
      address: "Address 3",
      photo: "https://picsum.photos/id/102/50/50",
      humanDetected: true,
    },
    {
      cam_id: "id_4",
      location: [41.29681833333333, 71.94040666666666],
      name: "Location 4",
      address: "Address 4",
      photo: "https://picsum.photos/id/103/50/50",
      humanDetected: false,
    },
    {
      cam_id: "id_5",
      location: [41.39681833333333, 72.04040666666666],
      name: "Location 5",
      address: "Address 5",
      photo: "https://picsum.photos/id/104/50/50",
      humanDetected: true,
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPositionIndex(
        (prevIndex) => (prevIndex + 1) % positions.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [positions.length]);

  useEffect(() => {
    const newPosition = positions[currentPositionIndex];
    if (
      newPosition &&
      newPosition.location &&
      newPosition.location.length === 2
    ) {
      setCenterPositions(newPosition.location);
    }
  }, [currentPositionIndex, positions]);

  useEffect(() => {
    const newPositions = [...positions];
    newPositions.splice(currentPositionIndex, 1);
    setPositions(newPositions);
  }, [currentPositionIndex]);

  const handleZoomButtonClick = (position, zoomLevel) => {
    if (position && position.location && position.location.length === 2) {
      setCenterPositions(position.location);
      setZoom(zoomLevel);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="col-span-1 sm:col-span-1 text-white">
          <div className="border-lime-600 border-8 py-2 px-3 bg-opacity-50 bg-lime-600 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <i className="fa-sharp fa-regular fa-radar fa-2x pr-3"></i>
            <p className="font-bebas text-2xl tracking-widest">Aniqlangan</p>
          </div>
          <div
            className="criminals_sidebar border-gray-500 border-8 mt-4 w-full relative overflow-auto"
            style={{ minHeight: "80vh" }}
          >
            <DetectHumanCard />
          </div>
        </div>

        <div className="col-span-1 sm:col-span-4 z-10">
          <MapContainer
            center={centerPositions}
            zoom={zoomCustom}
            scrollWheelZoom={true}
          >
            <TileLayer
              className="filter grayscale brightness-50 contrast-150"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {positions.map((position) => (
              <Marker
                key={position.cam_id}
                position={position.location}
                icon={
                  new L.DivIcon({
                    className: position.humanDetected ? "marker-icon" : "",
                    html: `<img src="${position.photo}" alt="${position.name}" style="width: 50px; height: 50px;" />`,
                    iconSize: [50, 50],
                    iconAnchor: [25, 25],
                    popupAnchor: [0, -25],
                  })
                }
              >
                <Tooltip permanent>
                  <div>
                    <img
                      src={position.photo}
                      alt={position.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                    <p>{position.name}</p>
                  </div>
                </Tooltip>
              </Marker>
            ))}
            <SetViewOnClick coords={centerPositions} zoomCustom={zoomCustom} />
          </MapContainer>
        </div>

        <div className="col-span-1 sm:col-span-1 text-white">
          <div className="border-lime-600 border-8 py-2 px-3 bg-opacity-50 bg-lime-600 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <i className="fa-sharp fa-solid fa-magnifying-glass fa-2x pr-3"></i>
            <p className="font-bebas text-2xl tracking-widest">
              QIDIRUVDAGILAR
            </p>
          </div>
          <div
            className="criminals_sidebar border-gray-500 border-8 mt-4 w-full relative overflow-auto"
            style={{ minHeight: "80vh" }}
          >
            {positions.map((position, index) => (
              <div
                key={index}
                onClick={() => {
                  setCenterPositions(position.location);
                  setZoom(12);
                }}
              >
                <CriminalCard
                  cardIndex={index}
                  style={{
                    backgroundColor: position.humanDetected ? "red" : "initial",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CameraMain;
