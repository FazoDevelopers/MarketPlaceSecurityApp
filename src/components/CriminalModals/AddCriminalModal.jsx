import React from "react";
import { useRecoilState } from "recoil";
import {
  isAddCriminalModalState,
  latState,
  lngState,
} from "../../recoil/atoms";
import ClickableMap from "../ClickableMap";

export default function AddCriminalModal() {
  const [lat, setLat] = useRecoilState(latState);
  const [lng, setLng] = useRecoilState(lngState);
  const [isAddCriminalModal, setIsAddCriminalModal] = useRecoilState(
    isAddCriminalModalState
  );
  return (
    <>
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black opacity-50 blur -z-10"></div>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-stone-900 text-white p-20 rounded shadow-lg w-4/5 grid grid-cols-2 gap-20">
            <div className="flex flex-col">
              <h1 className="font-bebas text-5xl text-center mb-4">
                JINOYATCHI QO`SHISH
              </h1>
              <div className="grid gap-10">
                <div>
                  <span className="bg-lime-600 px-1 font-extrabold">
                    JINOYATCHI NOMI
                  </span>
                  <input
                    type="text"
                    className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                  />
                </div>

                <div>
                  <span className="bg-lime-600 px-1 font-extrabold">
                    JINOYATCHI NOMI
                  </span>
                  <input
                    type="text"
                    className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                  />
                </div>

                <div>
                  <span className="bg-lime-600 px-1 font-extrabold">
                    JINOYATCHI NOMI
                  </span>
                  <input
                    type="text"
                    className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
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
              </div>
            </div>

            <div className="grid content-between">
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

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-yellow-800 px-4 py-2 border-2 border-yellow-600"
                  onClick={() => {
                    setIsAddCriminalModal(false);
                  }}
                >
                  <i className="fa-solid fa-xmark pr-2"></i> BEKOR QILISH
                </button>

                <button
                  type="button"
                  className="bg-green-800 px-4 py-2 border-2 border-green-600"
                >
                  <i className="fa-solid fa-plus pr-2"></i> QO`SHISH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}