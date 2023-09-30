import React from "react";

export default function CriminalCard({ marginChange }) {
  console.log("marginChange:", Number(marginChange) * 20);

  return (
    <>
      <div
        className="criminal_card_wrapper shadow-md absolute "
        style={{ marginTop: `${Number(marginChange) * 100}px` }}
      >
        <div className="border-lime-600 border-8 py-2 px-3 bg-opacity-50 bg-lime-600 text-white font-extrabold">
          <p className="font-bebas text-base">Namangan sh.</p>
          <p className="text-sm text-end font-orbitron">19:15:120 01.10.2023</p>
        </div>
        <img src="https://picsum.photos/400/400" alt="" />
      </div>
    </>
  );
}
