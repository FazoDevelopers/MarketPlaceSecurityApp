import React from "react";
import { useRecoilState } from "recoil";
import {
  isDelCriminalModalState,
  isUpCriminalModalState,
} from "../../recoil/atoms";

export default function ViewCriminalCard(props) {
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
            className="aspect-square w-full object-cover"
            src={props.data.image_url}
            alt=""
          />
        </div>

        <h1 className="text-2xl mt-1">Ism: {props.data.first_name}</h1>
        <h1 className="text-2xl mt-1">Familiya: {props.data.last_name}</h1>
        <h1 className="text-2xl mt-1">Otasi: YUQ</h1>
        <p className="font-thin">Sharh: {props.data.description}</p>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="bg-red-800 px-5 py-2"
            onClick={() => {
              setIsDelCriminalModal(true);
              console.log(props.data);
              props.deleteData(props.data);
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
