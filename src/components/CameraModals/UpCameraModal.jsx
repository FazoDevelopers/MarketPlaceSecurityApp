import React from "react";
import UpClickableMap from "../UpClickableMap";
import {
  isAddCameraModalState,
  isUpCameraModalState,
  latState,
  lngState,
} from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpCameraModal({ upCamDatas }) {
  const [lat, setLat] = useRecoilState(latState);
  const [lng, setLng] = useRecoilState(lngState);
  const [isUpCameraModal, setIsUpCameraModal] = useRecoilState(isUpCameraModalState);
  const { control, handleSubmit } = useForm();


const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

  // UPDATE CAMERA DATA
  const onSubmit = async (data) => {
    try {
      data = {
        ...data,
        longitude: parseFloat(lng),
        latitude: parseFloat(lat),
      }
      const response = await axios.patch(`http://192.168.1.132:8000/api/camera/${upCamDatas.id}/`, data);
      if(response.status===200){
        toast.success("Kamera muvafaqqiyatli tahrirlandi!", toastOptions);
      }else{
        toast.error("Kamera tahrirlanishda xatolik!", toastOptions);
      }
      console.log("Camera data updated:", response.data);
      console.log("Camera data:", data);
      console.log(response.status);
      setIsUpCameraModal(false);
    } catch (error) {
      console.error("Error updating camera data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black opacity-50 blur -z-10"></div>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-stone-900 text-white p-20 rounded shadow-lg w-4/5 grid grid-cols-2 gap-20">
            
            <div className="flex flex-col">
              <h1 className="font-bebas text-5xl text-center mb-4">
                #{upCamDatas.name} TAHRIRLASH
              </h1>
              
                <div className="mb-5">
                  <span className="bg-lime-600 px-1 font-extrabold">
                    KAMERA NOMI
                  </span>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={upCamDatas.name}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                      />
                    )}
                  />
                </div>

                <div className="mb-5">
                  <span className="bg-lime-600 px-1 font-extrabold">
                    KAMERA URL
                  </span>
                  <Controller
                    name="url"
                    control={control}
                    defaultValue={upCamDatas.url}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                      />
                    )}
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
             
            </div>

            <div className="grid content-between">
              <UpClickableMap upCameraData={upCamDatas} />

              <div className="flex justify-between mt-4">
                <button 
                  type="button"
                  className="bg-yellow-800 px-4 py-2 border-2 border-yellow-600"
                  onClick={() => {
                    setIsUpCameraModal(false);
                  }}
                >
                  <i className="fa-solid fa-xmark pr-2"></i> BEKOR QILISH
                </button>

                <button
                  type="submit"
                  className="bg-green-800 px-4 py-2 border-2 border-green-600"
                >
                  <i className="fa-solid fa-plus pr-2"></i> TAHRIRLASH
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </form>
  );
}
