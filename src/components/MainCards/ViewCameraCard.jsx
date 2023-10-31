import React from "react";
import { useRecoilState } from "recoil";
import {
  isDelCameraModalState,
  isUpCameraModalState,
} from "../../recoil/atoms";

export default function ViewCameraCard(props) {
  const [isUpCameraModal, setIsUpCameraModal] =
    useRecoilState(isUpCameraModalState);

  return (
    <div className="border-lime-600 border-4 py-2 px-3 bg-opacity-20 bg-lime-600 text-white font-extrabold">
      <div className="relative">
        <img
          src={props.data.image}
          alt="Your Image"
          className="w-full h-auto aspect-square  object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent p-3 font-bebas text-3xl">
          #{props.data.name}
        </div>
      </div>

      <h1 className="text-2xl font-bebas mt-3">{props.data.name}</h1>
      <p>
        ID: {props.data.id} <br />
        Latitude: <b>{props.data.latitude}</b> <br />
        Longitude: <b>{props.data.longitude}</b>
      </p>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="bg-red-800 px-5 py-2"
          onClick={() => {
            props.deleteCamera(props.data);
          }}
        >
          <i className="fa-solid fa-trash"></i> O`CHIRISH
        </button>

        <button
          type="button"
          className="bg-green-800 px-5 py-2"
          onClick={() => {
            setIsUpCameraModal(true);
            props.upCameraDatas(props.data);
          }}
        >
          <i className="fa-solid fa-pen-to-square"></i> TAHRIRLASH
        </button>
      </div>
    </div>
  );
}
