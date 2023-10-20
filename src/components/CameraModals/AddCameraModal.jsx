import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { isAddCameraModalState, latState, lngState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { MAIN_URL } from "../../variables";
import ClickableMap from "../ClickableMap";

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const prepareCameraData = (data, lat, lng, placeImg) => {
  return {
    id: Math.floor(Math.random() * 100),
    name: data.cameraName,
    url: data.cameraUrl,
    image: placeImg,
    longitude: parseFloat(lng),
    latitude: parseFloat(lat),
  };
};

const handleSuccess = () => {
  toast.success("Kamera muvafaqqiyatli qo'shildi!", toastOptions);
};

const handleError = (error) => {
  console.error("Error:", error);
  toast.error("Kamera qo'shishda xatolik!", toastOptions);
};

export default function AddCameraModal() {
  const [lat, setLat] = useRecoilState(latState);
  const [lng, setLng] = useRecoilState(lngState);
  const [placeImg, setPlaceImg] = useState(null);

  const [isAddCameraModal, setIsAddCameraModal] = useRecoilState(
    isAddCameraModalState
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      cameraName: "",
      cameraUrl: "",
    },
  });

  const onSubmit = async (formData) => {
    const cameraData = prepareCameraData(formData, lat, lng, placeImg);
    console.log(cameraData);
    try {
      const response = await axios.post(
        `http://192.168.1.132:8000/api/camera/`,
        cameraData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        handleSuccess();
        console.log(response);
        setIsAddCameraModal(false);
      } else if (response.status === 400) {
        console.log(400);
      } else {
        handleError(response.statusText);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50 blur -z-10"></div>
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-stone-900 text-white p-20 rounded shadow-lg w-4/5 grid grid-cols-2 gap-20"
        >
          <div className="flex flex-col">
            <h1 className="font-bebas text-5xl text-center mb-4">
              KAMERA QO`SHISH
            </h1>
            <div className="grid gap-10">
              <div>
                <span className="bg-lime-600 px-1 font-extrabold">
                  KAMERA NOMI
                </span>
                <Controller
                  name="cameraName"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                    />
                  )}
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
                    setPlaceImg(e.target.files[0]);
                  }}
                />
              </div>

              <div>
                <span className="bg-lime-600 px-1 font-extrabold">
                  KAMERA URL
                </span>
                <Controller
                  name="cameraUrl"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid content-between">
            <ClickableMap />

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-yellow-800 px-4 py-2 border-2 border-yellow-600"
                onClick={() => {
                  setIsAddCameraModal(false);
                }}
              >
                <i className="fa-solid fa-xmark pr-2"></i> BEKOR QILISH
              </button>

              <button
                type="submit"
                className="bg-green-800 px-4 py-2 border-2 border-green-600"
              >
                <i className="fa-solid fa-plus pr-2"></i> QO`SHISH
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
