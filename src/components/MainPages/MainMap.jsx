import { useState, useEffect } from "react";
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
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import PinnedCards from "../MainCards/PinnedCards";
import { handleError } from "../globals";
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

const zoomCustom = 15;

function CombinedComponent() {
  const [criminalData, setCriminalData] = useState([]);
  const [criminalDetectData, setCriminalDetectData] = useState([]);
  const [positions, setPositions] = useState([]);
  const [centerPositions, setCenterPositions] = useState([42, 21]);
  const [isConnected, setIsConnected] = useState(false);
  const [pinnedCriminals, setPinnedCriminals] = useState([]);

  console.log(pinnedCriminals);

  useEffect(() => {
    const interval = setInterval(() => {
      setCriminalData((prevData) =>
        prevData.length > 0 ? prevData.slice(1) : prevData
      );
      console.log(criminalData);
    }, 150000000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [criminalData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCriminalDetectData((prevData) =>
        prevData.length > 0 ? prevData.slice(1) : prevData
      );
      console.log(criminalDetectData);
    }, 6000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [criminalDetectData]);

  // Positions Timer Hook
  useEffect(() => {
    const positionsTimer = setTimeout(() => {
      setPositions((prevPositions) => prevPositions.slice(1));
    }, 150000000);

    return () => clearTimeout(positionsTimer);
  }, [positions, setPositions]);

  // WebSocket Hook for exist in database
  useEffect(() => {
    const newSocket = new WebSocket("ws://192.168.1.132:5000");

    const handleOpen = () => {
      console.log("Connected to the WebSocket");
      newSocket.send(JSON.stringify({ state: "web" }));
      setIsConnected(true);
    };
    if (!isConnected) {
      handleError("WebSocket ulanganiga ishonch hosil qiling!");
    }

    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // console.log(data);

        if (data.camera) {
          const { latitude, longitude, name, image } = data.camera;
          const newPosition = {
            location: [latitude, longitude],
            name,
            photo: image,
            humanDetected: true,
          };

          setPositions((prevPositions) => [newPosition, ...prevPositions]);
          setCenterPositions([latitude, longitude]);
        }

        setCriminalData((prevData) => {
          return [
            <div
              key={uuidv4()}
              onClick={() => {
                setCenterPositions([
                  data.camera.latitude,
                  data.camera.longitude,
                ]);
                console.log(data);
              }}
            >
              <CriminalCard
                setPinnedCriminals={setPinnedCriminals}
                pinnedCriminals={pinnedCriminals}
                data={data}
              />
            </div>,
            ...prevData,
          ];
        });
      } catch (error) {
        console.error("Error while processing JSON data:", error);
      }
    };

    const handleErrorWebSocket = (event) => {
      console.error("WebSocket connection error:", event);
    };

    const handleClose = (event) => {
      console.error("WebSocket connection closed:", event);
    };

    newSocket.addEventListener("open", handleOpen);
    newSocket.addEventListener("message", handleMessage);
    newSocket.addEventListener("error", handleErrorWebSocket);
    newSocket.addEventListener("close", handleClose);

    return () => {
      newSocket.removeEventListener("open", handleOpen);
      newSocket.removeEventListener("message", handleMessage);
      newSocket.removeEventListener("error", handleErrorWebSocket);
      newSocket.removeEventListener("close", handleClose);
      newSocket.close();
    };
  }, [setIsConnected, setPositions, setCenterPositions, setCriminalData]);

  // WebSocket Hook for detect human
  useEffect(() => {
    const newSocket = new WebSocket("ws://192.168.1.132:5678/");

    const handleOpen = (event) => {
      console.log("Connected to the WebSocket detect");
      newSocket.send(JSON.stringify({ state: "web" }));
      setIsConnected(true);
    };

    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // console.log(data);
        setCriminalDetectData((prevData) => [
          <DetectHumanCard key={uuidv4()} data={data} />,
          ...prevData,
        ]);
      } catch (error) {
        console.error("Error while processing JSON data:", error);
      }
    };

    const handleErrorWebSocket = (event) => {
      console.error("WebSocket connection error:", event);
    };

    const handleClose = (event) => {
      console.error("WebSocket connection closed:", event);
    };

    newSocket.addEventListener("open", handleOpen);
    newSocket.addEventListener("message", handleMessage);
    newSocket.addEventListener("error", handleErrorWebSocket);
    newSocket.addEventListener("close", handleClose);

    return () => {
      newSocket.removeEventListener("open", handleOpen);
      newSocket.removeEventListener("message", handleMessage);
      newSocket.removeEventListener("error", handleErrorWebSocket);
      newSocket.removeEventListener("close", handleClose);
      newSocket.close();
    };
  }, [setCriminalDetectData]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="col-span-1 sm:col-span-1 text-white">
          <div
            className={`${
              isConnected
                ? "border-lime-600 bg-lime-600"
                : "border-red-600 bg-red-600"
            } border-8 py-2 px-3 bg-opacity-50 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto`}
          >
            <i className="fa-sharp fa-regular fa-radar fa-2x pr-3"></i>
            <p className="font-bebas text-2xl tracking-widest">Aniqlangan</p>
          </div>

          <div
            // className="criminals_sidebar border-gray-500 border-8 mt-4 w-full relative overflow-auto"
            className="criminals_sidebar border-gray-500 border-2 hide-scrollbar mt-4 w-full relative overflow-y-scroll"
            style={{ maxHeight: "80vh" }}
          >
            {criminalDetectData}
          </div>
        </div>

        <div className="col-span-1 sm:col-span-4 z-10 relative">
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
                    html: `<img src="${position.photo}" alt="${position.name}" style="width: 50px; height: 50px; border-radius: 50%; object-fit:cover" />`,
                    iconSize: [50, 50],
                    iconAnchor: [25, 25],
                    popupAnchor: [0, -25],
                  })
                }
              >
                <Tooltip permanent>
                  <p>{position.name}</p>
                </Tooltip>
              </Marker>
            ))}
            <SetViewOnClick coords={centerPositions} zoomCustom={zoomCustom} />
          </MapContainer>
        </div>
        <div className="text-white fixed bottom-[100px] left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
          {pinnedCriminals.length > 0 &&
            pinnedCriminals.map((criminal) => (
              <PinnedCards key={criminal.key} data={criminal} />
            ))}
        </div>

        <div className="col-span-1 sm:col-span-1 text-white">
          <div className="border-lime-600 border-8 py-2 px-3 bg-opacity-50 bg-lime-600 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <i className="fa-sharp fa-solid fa-magnifying-glass fa-2x pr-3"></i>
            <p className="font-bebas text-2xl tracking-widest">
              QIDIRUVDAGILAR
            </p>
          </div>
          <div
            className="criminals_sidebar border-gray-500 border-2 hide-scrollbar mt-4 w-full relative overflow-y-scroll"
            style={{ maxHeight: "80vh" }}
          >
            {isConnected ? (
              criminalData
            ) : (
              <div>
                <h1 className="text-red-500 text-center p-3">
                  WebSocket ulanganiga ishonch hosil qiling!
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinedComponent;

SetViewOnClick.propTypes = {
  coords: PropTypes.array.isRequired,
  zoomCustom: PropTypes.number.isRequired,
};
