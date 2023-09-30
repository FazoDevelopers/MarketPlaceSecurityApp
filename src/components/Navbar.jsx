import React from "react";

export default function Navbar() {
  return (
    <>
      <div className="navbar_wrapper">
        <div className="container mx-auto p-4 flex flex-wrap justify-evenly max-w-screen-lg">
          <div className="border-gray-400 border-8 py-2 px-3 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <i className="fa-sharp fa-solid fa-house fa-2x pr-3"></i>
            <p className="font-bebas text-2xl">Bosh sahifa</p>
          </div>
          <div className="border-gray-400 border-8 py-2 px-3 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <i className="fa-solid fa-camera-cctv fa-2x pr-3"></i>
            <p className="font-bebas text-2xl">Kamera qo`shish</p>
          </div>
          <div className="border-gray-400 border-8 py-2 px-3 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <i className="fa-sharp fa-solid fa-user-secret fa-2x pr-3"></i>
            <p className="font-bebas text-2xl">o`g`ri qo`shish</p>
          </div>
          <div className="border-gray-400 border-8 py-2 px-3 text-white font-extrabold flex items-center w-full md:w-auto">
            <i className="fa-sharp fa-solid fa-magnifying-glass fa-2x pr-3"></i>
            <p className="font-bebas text-2xl">o`g`ri qidirish</p>
          </div>
        </div>
      </div>
    </>
  );
}
