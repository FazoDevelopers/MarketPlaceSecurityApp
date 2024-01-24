import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import detectionSound from "../../assets/sounds/detection.mp3";
import {
  BASE_URL,
  DETECT_SOCKET_URL,
  DETECT_TIMEOUT,
  MAP_CONFIG,
} from "../../utils/constants";
import mapLayers from "../../utils/map_layers";
import CriminalCard from "../MainCards/CriminalCard";
import DetectHumanCard from "../MainCards/DetectHumanCard";
import PinnedCards from "../MainCards/PinnedCards";
import "../MainStyle.css";
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
const zoomCustom = MAP_CONFIG.zoomCustom;

function CombinedComponent() {
  const [criminalData, setCriminalData] = useState([]);
  const [criminalDetectData, setCriminalDetectData] = useState([]);
  const [positions, setPositions] = useState([]);
  const [centerPositions, setCenterPositions] = useState([
    40.996289671996706, 3671.640515327454,
  ]);
  const [isConnected, setIsConnected] = useState(false);
  const [pinnedCriminals, setPinnedCriminals] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState("");

  const detectionAudio = new Audio(detectionSound);
  const playDetectionSound = () => {
    detectionAudio.play();
  };
  const stopDetectionSound = () => {
    detectionAudio.pause();
    detectionAudio.currentTime = 0;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCriminalData((prevData) =>
        prevData.length > 0 ? prevData.slice(1) : prevData
      );
    }, DETECT_TIMEOUT);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [criminalData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCriminalDetectData((prevData) =>
        prevData.length > 0 ? prevData.slice(1) : prevData
      );
    }, DETECT_TIMEOUT);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [criminalDetectData]);

  // Positions Timer Hook
  useEffect(() => {
    const positionsTimer = setTimeout(() => {
      setPositions((prevPositions) => prevPositions.slice(1));
    }, DETECT_TIMEOUT);

    return () => clearTimeout(positionsTimer);
  }, [positions, setPositions]);

  // Interval exist in database
  useEffect(() => {
    const fetchDatas = setInterval(async () => {
      const response = await fetch(`${BASE_URL}/api/web-results/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      data && setIsConnected(true);
      console.log(data);
      if (data.camera) {
        // Process camera data    
        const { latitude, longitude, name, image } = data.camera;
        const newPosition = {
          location: [latitude, longitude],
          name,
          photo: image,
          humanDetected: true,
        };

        setPositions((prevPositions) => [newPosition, ...prevPositions]);
        setCenterPositions([latitude, longitude]);
        playDetectionSound();

        setCriminalData((prevData) => {
          // Process criminal data
          return [
            <div
              key={uuidv4()}
              onClick={() => {
                setCenterPositions([
                  data.camera.latitude,
                  data.camera.longitude,
                ]);
                 
              }}
              onKeyDown={() => {}}
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

        setCriminalDetectData((prevData) => [
          <DetectHumanCard key={uuidv4()+1} data={data} />,
          ...prevData,
        ]);
      }
    }, 500);

    return () => clearInterval(fetchDatas);
  }, [isConnected]);

  // WebSocket Hook for detect human
  // useEffect(() => {
  //   const newSocket = new WebSocket(DETECT_SOCKET_URL);
  //   const handleOpen = () => {
  //     console.log("Connected to the WebSocket detect");
  //     newSocket.send(
  //       JSON.stringify({ state: "web", token: localStorage.getItem("token") })
  //     );
  //     setIsConnected(true);
  //   };
  //   const handleMessage = (event) => {
  //     try {
  //       const data = JSON.parse(event.data);
  //       setCriminalDetectData((prevData) => [
  //         <DetectHumanCard key={uuidv4()+1} data={data} />,
  //         ...prevData,
  //       ]);
  //     } catch (error) {
  //       console.error("Error while processing JSON data:", error);
  //     }
  //   };
  //   const handleErrorWebSocket = (event) => {
  //     console.error("WebSocket connection error:", event);
  //   };
  //   const handleClose = (event) => {
  //     console.error("WebSocket connection closed:", event);
  //   };
  //   newSocket.addEventListener("open", handleOpen);
  //   newSocket.addEventListener("message", handleMessage);
  //   newSocket.addEventListener("error", handleErrorWebSocket);
  //   newSocket.addEventListener("close", handleClose);
  //   return () => {
  //     newSocket.removeEventListener("open", handleOpen);
  //     newSocket.removeEventListener("message", handleMessage);
  //     newSocket.removeEventListener("error", handleErrorWebSocket);
  //     newSocket.removeEventListener("close", handleClose);
  //     newSocket.close();
  //   };
  // }, [setCriminalDetectData]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedLayer(selectedValue);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
        <div className="col-span-1 text-white sm:col-span-1">
          <div
            className={`${
              isConnected
                ? "border-lime-600 bg-lime-600"
                : "border-red-600 bg-red-600"
            } border-8 py-2 px-3 bg-opacity-50 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto`}
          >
            <i className="pr-3 fa-sharp fa-regular fa-radar fa-2x"></i>
            <p className="text-2xl tracking-widest font-bebas">Aniqlangan</p>
          </div>

          <div
            className="relative w-full mt-4 border-2 border-gray-500 criminals_sidebar hide-scrollbar"
            style={{ maxHeight: "80vh" }}
          >
            {criminalDetectData.length > 0 && criminalDetectData}
          </div>
        </div>

        <div className="relative z-10 col-span-1 sm:col-span-4">
          <MapContainer
            center={centerPositions}
            zoom={zoomCustom}
            scrollWheelZoom={true}
          >
            <TileLayer
              // url="../../src/assets/Uzb/{z}/{x}/{y}.png"
              url={
                selectedLayer
                  ? selectedLayer
                  : "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}"
              }
            />
            {positions.map((position, index) => (
              <Marker
                key={index}
                position={position.location}
                onClick={() => {
                  stopDetectionSound();
                }}
                icon={
                  new L.DivIcon({
                    className: position.humanDetected ? "marker-icon" : "",
                    html: `<img src="${BASE_URL + position.photo}" alt="${
                      position.name
                    }" style="width: 50px; height: 50px; border-radius: 50%; object-fit:cover" />`,
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
              <PinnedCards key={criminal.identity.id} data={criminal} />
            ))}
        </div>

        <div className="col-span-1 text-white sm:col-span-1">
          <select
            className="w-full bg-black text-white"
            value={selectedLayer}
            onChange={handleSelectChange}
          >
            {mapLayers.map((layer, index) => (
              <option key={index} value={layer.value}>
                {layer.label}
              </option>
            ))}
          </select>
          <div className="flex items-center w-full px-3 py-2 mb-4 font-extrabold text-white bg-opacity-50 border-8 border-lime-600 bg-lime-600 md:mb-0 md:w-auto">
            <i className="pr-3 fa-sharp fa-solid fa-magnifying-glass fa-2x"></i>
            <p className="text-2xl tracking-widest font-bebas">
              QIDIRUVDAGILAR
            </p>
          </div>
          <div
            className="text-center relative w-full mt-4 overflow-y-scroll border-2 border-gray-500 criminals_sidebar hide-scrollbar"
            style={{ maxHeight: "80vh" }}
          >
            {isConnected ? (
              criminalData
            ) : (
              <div>
                <h1 className="p-3 text-center text-red-500">
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
