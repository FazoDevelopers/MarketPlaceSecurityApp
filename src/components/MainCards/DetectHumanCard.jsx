import React, { useState } from "react";
import "../MainStyle.css";
export default function DetectHumanCard({ cardIndex }) {
  const [isPinned, setIsPinned] = useState(false);

  const pinCriminal = () => {
    setIsPinned(!isPinned);
    console.log(isPinned);
  };
  return (
    <>
      <div
        className="criminal_card_wrapper absolute p-2 overflow-hidden cursor-pointer hover:z-20 w-full opacity-95"
        style={{
          marginTop: isPinned ? 0 : `${Number(cardIndex) * 100}px`,
          zIndex: isPinned ? 99 : "unset",
          // transform: "perspective(600px) rotateX(-45deg)",
        }}
      >
        <div className="border-gray-500 border-8 py-2 px-3 bg-gray-600 text-white font-extrabold">
          <div className="flex justify-between align-middle">
            <span className="font-bebas text-base">Namangan sh.</span>{" "}
            <i
              className="fa-solid fa-thumbtack"
              style={isPinned ? { transform: "rotate(35deg)" } : null}
              onClick={pinCriminal}
            ></i>
          </div>
          <p className="text-sm text-end font-orbitron">19:15:120 01.10.2023</p>
        </div>
        {/* <img
          src="https://picsum.photos/400/400"
          className="object-cover"
          alt=""
        /> */}
      </div>
    </>
  );
}
