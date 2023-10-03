import React from "react";
import { useRecoilState } from "recoil";
import {
  isDelCriminalModalState,
  isUpCriminalModalState,
} from "../../recoil/atoms";

export default function ViewCriminalCard() {
  const [isUpCriminalModal, setIsUpCriminalModal] = useRecoilState(
    isUpCriminalModalState
  );

  const [isDelCriminalModal, setIsDelCriminalModal] = useRecoilState(
    isDelCriminalModalState
  );
  return (
    <>
      <div className="border-lime-600 border-4 py-2 px-3 bg-opacity-20 bg-lime-600 text-white font-extrabold">
        <div className="relative">
          <img
            src="https://picsum.photos/100/100"
            alt="Your Image"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent p-3 font-bebas text-3xl">
            #chorsu
          </div>
        </div>

        <h1 className="text-2xl mt-1">Ism: John</h1>
        <h1 className="text-2xl mt-1">Familiya: Doe</h1>
        <h1 className="text-2xl mt-1">Otasi: Donny</h1>
        <p className="font-thin">
          Sharh:
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          obcaecati eaque
        </p>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="bg-red-800 px-5 py-2"
            onClick={() => {
              setIsDelCriminalModal(true);
            }}
          >
            <i className="fa-solid fa-trash"></i> O`CHIRISH
          </button>
          <button
            type="button"
            className="bg-green-800 px-5 py-2"
            onClick={() => {
              setIsUpCriminalModal(true);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i> TAHRIRLASH
          </button>
        </div>
      </div>
    </>
  );
}
