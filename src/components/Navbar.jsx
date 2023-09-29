import React from "react";

export default function Navbar() {
  return (
    <>
      <div className="navbar_wrapper">
        <div className="container mx-auto p-4 flex flex-wrap justify-evenly max-w-screen-lg">
          <div className="border-gray-400 border-8 p-3 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <i className="fa-duotone fa-house fa-2x pr-3"></i>
            <p className="font-bebas text-2xl">Bosh sahifa</p>
          </div>
          <div className="border-gray-400 border-8 p-3 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <i className="fa-solid fa-camera-cctv fa-2x pr-3"></i>
            <p className="font-bebas text-2xl">Kamera qo`shish</p>
          </div>
          <div className="border-gray-400 border-8 p-3 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <i className="fa-solid fa-camera-cctv fa-2x pr-3"></i>
            <p className="font-bebas text-2xl">o`g`ri qo`shish</p>
          </div>
          <div className="border-gray-400 border-8 p-3 text-white font-extrabold flex items-center w-full md:w-auto">
            <i className="fa-solid fa-camera-cctv fa-2x pr-3"></i>
            <p className="font-bebas text-2xl">o`g`ri qidirish</p>
          </div>
        </div>
      </div>
    </>
  );
}
