import React, { useState } from "react";
import "../MainStyle.css";
export default function DetectHumanCard({ data }) {
  const [isPinned, setIsPinned] = useState(false);

  const pinCriminal = () => {
    setIsPinned(!isPinned);
    console.log(isPinned);
  };
  return (
    <>
      <div
        className="criminal_card_wrapper p-2 overflow-hidden cursor-pointer hover:z-20 w-full opacity-95"
        style={{
          // marginTop: isPinned ? 0 : `${Number(cardIndex) * 100}px`,
          zIndex: isPinned ? 99 : "unset",
          // transform: "perspective(600px) rotateX(-45deg)",
        }}
      >
        <div className="border-gray-500 border-2 bg-gray-600 text-white font-extrabold">
          <div className="grid grid-cols-2">
            <img src={data.image_path} className="object-cover" alt="" />
            <div className="flex flex-col justify-between align-middle p-2">
              <span className="font-bebas text-base">
                {data.camera_object.name}
              </span>
              <span className="font-bebas text-sm">
                Lat: {data.camera_object.latitude}
              </span>
              <span className="font-bebas text-sm">
                Long: {data.camera_object.longitude}
              </span>
              <i
                className="fa-solid fa-thumbtack"
                style={isPinned ? { transform: "rotate(35deg)" } : null}
                onClick={pinCriminal}
              ></i>
            </div>
          </div>
          <p className="text-sm font-orbitron text-end bg-red-500 p-2">
            19:15:120 01.10.2023
          </p>
        </div>
      </div>
    </>
  );
}
