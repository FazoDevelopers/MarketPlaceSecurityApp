import React, { useState, useEffect, useRef } from "react";
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

function CombinedComponent() {
  const [socket, setSocket] = useState(null);
  const divRef = useRef(null);
  const timeouts = {};

  const [centerPositions, setCenterPositions] = useState([
    40.99681833333333, 71.64040666666666,
  ]);
  const [zoomCustom, setZoom] = useState(12);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [cardData, setCardData] = useState();

  const [positions, setPositions] = useState([
    {
      cam_id: "id_1",
      location: [40.99681833333333, 71.64040666666666],
      name: "Location 1",
      address: "Address 1",
      photo: "https://picsum.photos/id/100/50/50",
      humanDetected: true,
    },
  ]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://192.168.1.155:8000");

    setSocket(newSocket);

    newSocket.addEventListener("open", (event) => {
      console.log("Connected to the WebSocket");
    });

    newSocket.addEventListener("message", (event) => {
      console.log("Received data:", event.data);

      try {
        const jsonData = JSON.parse(event.data);
        console.log("Parsed data:", jsonData);
        setCardData(jsonData);

        if (divRef.current) {
          console.log(jsonData);

          // Create a CriminalCard component with jsonData as a prop
          // const criminalCardComponent = <CriminalCard data={jsonData} />;

          // divRef.current.innerHTML += `<h1>${jsonData.first_name}</h1>`;
          console.log(divRef.current);
          divRef.current.innerHTML += `<div class="text-center">
            <h1 class="bg-red-500">${jsonData.first_name}</h1>
            <img src='http://192.168.1.155:5000/media/${jsonData.first_name}'/>
          <div/>`;
          // divRef.current.appendChild(criminalCardComponent);

          const timeout = setTimeout(() => {
            if (divRef.current && divRef.current.firstChild) {
              divRef.current.removeChild(divRef.current.firstChild);
            }
          }, 5000);
          timeouts[jsonData.id] = timeout;
        }
      } catch (error) {
        console.log("Data received is not JSON:", event.data);
      }
    });

    newSocket.addEventListener("close", (event) => {
      console.log("WebSocket closed:", event);
    });

    newSocket.addEventListener("error", (event) => {
      console.error("WebSocket Error:", event);
    });

    divRef.current.addEventListener("childremove", (event) => {
      const jsonDataId = event.target.firstChild.id;
      clearTimeout(timeouts[jsonDataId]);
      delete timeouts[jsonDataId];
    });

    return () => {
      newSocket.close();
      for (const timeoutId in timeouts) {
        clearTimeout(timeouts[timeoutId]);
      }
    };
  }, []);

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
            ref={divRef}
            className="criminals_sidebar border-gray-500 border-8 mt-4 w-full relative overflow-auto"
            style={{ minHeight: "80vh" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default CombinedComponent;
