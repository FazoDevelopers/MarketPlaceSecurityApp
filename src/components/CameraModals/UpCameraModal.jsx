import React from "react";
import ClickableMap from "../ClickableMap";
import {
  isAddCameraModalState,
  isUpCameraModalState,
  latState,
  lngState,
} from "../../recoil/atoms";
import { useRecoilState } from "recoil";

export default function UpCameraModal({ upCamDatas }) {
  const [lat, setLat] = useRecoilState(latState);
  const [lng, setLng] = useRecoilState(lngState);
  const [isUpCameraModal, setIsUpCameraModal] =
    useRecoilState(isUpCameraModalState);
  return (
    <>
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black opacity-50 blur -z-10"></div>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-stone-900 text-white p-20 rounded shadow-lg w-4/5 grid grid-cols-2 gap-20">
            <div className="flex flex-col">
              <h1 className="font-bebas text-5xl text-center mb-4">
                #{upCamDatas.name} TAHRIRLASH
              </h1>
              <div className="grid gap-10">
                <div>
                  <span className="bg-lime-600 px-1 font-extrabold">
                    KAMERA NOMI
                  </span>
                  <input
                    type="text"
                    className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                    defaultValue={upCamDatas.name}
                  />
                </div>

                <div>
                  <span className="bg-lime-600 px-1 font-extrabold">
                    KAMERA MANZILI
                  </span>
                  <input
                    type="text"
                    className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none appearance-none cursor-not-allowed"
                    value={`Latitude: ${lat}, Longitude: ${lng}`}
                    disabled
                    readOnly
                  />
                </div>

                <div className="flex flex-col">
                  <span className="bg-lime-600 px-1 font-extrabold w-32 mb-1">
                    JOY RASMI
                  </span>
                  <input
                    type="file"
                    className="border-2 border-lime-600 p-3"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                    }}
                  />
                </div>

                <div>
                  <span className="bg-lime-600 px-1 font-extrabold">
                    KAMERA URL
                  </span>
                  <input
                    type="text"
                    className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                    defaultValue={upCamDatas.url}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-red-800 px-4 py-2 border-2 border-red-600"
                >
                  <i className="fa-solid fa-rotate-right pr-2"></i> TOZALASH
                </button>
                <button
                  type="button"
                  className="bg-green-800 px-4 py-2 border-2 border-green-600"
                >
                  <i className="fa-solid fa-plus pr-2"></i> QO`SHISH
                </button>
              </div>
            </div>

            <div className="grid content-between">
              <ClickableMap />

              <button
                type="button"
                className="bg-yellow-800 px-4 py-2 border-2 border-yellow-600"
                onClick={() => {
                  setIsUpCameraModal(false);
                }}
              >
                <i className="fa-solid fa-xmark pr-2"></i> BEKOR QILISH
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
