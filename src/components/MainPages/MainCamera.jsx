import React from "react";
import ViewCameraCard from "../MainCards/ViewCameraCard";
import AddCameraModal from "../CameraModals/AddCameraModal";

export default function MainCamera() {
  return (
    <>
      <AddCameraModal />
      <div className="container mx-auto text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="font-bebas text-4xl md:text-6xl mb-4 md:mb-0">
            KAMERALAR
          </h1>
          <button
            type="button"
            className="p-2 bg-green-500 text-white font-extrabold"
          >
            <i className="fa-sharp fa-solid fa-plus p-1"></i>
            QO`SHISH
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <ViewCameraCard />
          <ViewCameraCard />
          <ViewCameraCard />
          <ViewCameraCard />
          <ViewCameraCard />
          <ViewCameraCard />
          <ViewCameraCard />
          <ViewCameraCard />
        </div>

        <div className="flex justify-center my-5">
          <button
            type="button"
            className="bg-green-800 px-5 py-2 font-extrabold m-3"
          >
            <i className="fa-solid fa-chevron-left"></i> OLDINGI
          </button>
          <button
            type="button"
            className="bg-green-500 px-5 py-2 font-extrabold m-3"
          >
            KEYINGI <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
