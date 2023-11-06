import UpClickableMap from "../UpClickableMap";
import { isUpCameraModalState, latState, lngState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { useState } from "react";
import { handleError, handleSuccess } from "../Notifications.js";

export default function UpCameraModal(props) {
  const [lat] = useRecoilState(latState);
  const [lng] = useRecoilState(lngState);
  const [isUpCameraModal, setIsUpCameraModal] =
    useRecoilState(isUpCameraModalState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [placeImg, setPlaceImg] = useState(null);

  // SEND FORMDATA TO BACKEND
  const onSubmit = async (data) => {
    const cameraData = new FormData();
    cameraData.append("name", data.cameraName);
    cameraData.append("url", data.cameraUrl);
    cameraData.append("latitude", lat);
    cameraData.append("longitude", lng);

    if (placeImg) {
      cameraData.append("image", placeImg);
    }

    try {
      const response = await axios.patch(
        `http://192.168.1.132:8000/api/camera/${props.upCamDatas.id}/`,
        cameraData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        props.fetch();
        handleSuccess("Kamera muvafaqqiyatli tahrirlandi!");
      } else {
        handleError("Kamera tahrirlanishda xatolik!");
      }

      console.log("Camera data updated:", response.data);
      console.log("Camera data:", cameraData);
      console.log(response.status);
      setIsUpCameraModal(false);
    } catch (error) {
      handleError("Serverga ulanib bo'lmadi!");
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
                #{props.upCamDatas.name} TAHRIRLASH
              </h1>

              {/* KAMERA NOMI */}
              <div className="mb-5">
                <span className="bg-lime-600 px-1 font-extrabold">
                  KAMERA NOMI
                </span>
                <input
                  type="text"
                  defaultValue={props.upCamDatas.name}
                  {...register("cameraName", {
                    required: "Kamera nomi majburiy",
                    pattern: {
                      value: /^[A-Za-z_ '"`]+$/,
                      message: "Belgi ishlatish mumkin emas",
                    },
                  })}
                  className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                />
                {errors.cameraName && (
                  <p className="text-red-500">{errors.cameraName.message}</p>
                )}
              </div>

              {/* KAMERA URLI */}
              <div className="mb-5">
                <span className="bg-lime-600 px-1 font-extrabold">
                  KAMERA URL
                </span>
                <input
                  type="text"
                  defaultValue={props.upCamDatas.url}
                  {...register("cameraUrl", {
                    required: "Kamera manzili majburiy",
                  })}
                  className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                />
                {errors.cameraUrl && (
                  <p className="text-red-500">{errors.cameraUrl.message}</p>
                )}
              </div>

              {/* JOY RASMI */}
              <div className="flex flex-col">
                <span className="bg-lime-600 px-1 font-extrabold w-32 mb-1">
                  JOY RASMI
                </span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/svg"
                  className="border-2 border-lime-600 p-3"
                  {...(errors.cameraName && (
                    <p className="text-red-500">{errors.cameraName.message}</p>
                  ))}
                  onChange={(e) => {
                    setPlaceImg(e.target.files[0]);
                  }}
                />
              </div>
            </div>

            <div className="grid content-between">
              <UpClickableMap upCameraData={props.upCamDatas} />

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

UpCameraModal.propTypes = {
  fetch: PropTypes.func.isRequired,
  upCamDatas: PropTypes.object.isRequired,
};
