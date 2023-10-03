import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="navbar_wrapper">
        <div className="container mx-auto p-4 flex flex-wrap justify-evenly max-w-screen-lg">
          <Link to="/" className="border-gray-400 border-8 py-2 px-3 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <i className="fa-sharp fa-solid fa-house pr-3"></i>
            <p className=" text-basis">BOSH SAHIFA</p>
          </Link>
          <Link to="/camera" className="border-gray-400 border-8 py-2 px-3 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <i className="fa-solid fa-camera-cctv pr-3"></i>
            <p className="text-basis">KAMERALAR</p>
          </Link>
          <Link to="/criminal" className="border-gray-400 border-8 py-2 px-3 text-white font-extrabold flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <i className="fa-sharp fa-solid fa-user-secret pr-3"></i>
            <p className="text-basis">JINOYATCHILAR</p>
          </Link>
          <Link to="/search" className="border-gray-400 border-8 py-2 px-3 text-white font-extrabold flex items-center w-full md:w-auto">
            <i className="fa-sharp fa-solid fa-magnifying-glass pr-3"></i>
            <p className="text-basis">QIDIRISH</p>
          </Link>
        </div>
      </div>
    </>
  );
}
