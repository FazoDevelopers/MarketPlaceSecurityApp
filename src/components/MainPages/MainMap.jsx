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
import "../MainStyle.css";
import CriminalCard from "../MainCards/CriminalCard";
import DetectHumanCard from "../MainCards/DetectHumanCard";

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

const zoomCustom = 10;

function CombinedComponent() {
  const [criminalData, setCriminalData] = useState([]);
  const [positions, setPositions] = useState([]);
  const [centerPositions, setCenterPositions] = useState([42, 21]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://192.168.1.132:5000/");

    newSocket.addEventListener("open", (event) => {
      console.log("Connected to the WebSocket");
    });

    newSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data);

        if (data.camera) {
          const { latitude, longitude, name, image } = data.camera;
          const newPosition = {
            location: [latitude, longitude],
            name: name,
            photo: image,
            humanDetected: true,
          };

          setPositions((prevPositions) => [...prevPositions, newPosition]);
          setCenterPositions([latitude, longitude]);
        }

        setCriminalData((prevData) => [
          ...prevData,
          <CriminalCard key={data.key} data={data} />,
        ]);
      } catch (error) {
        console.error("Error while processing JSON data:", error);
      }
    };

    newSocket.addEventListener("error", (event) => {
      console.error("WebSocket connection error:", event);
    });

    newSocket.addEventListener("close", (event) => {
      console.error("WebSocket connection closed:", event);
    });
  }, []);

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
            {positions.map((position, index) => (
              <Marker
                key={index}
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
            {criminalData}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinedComponent;
