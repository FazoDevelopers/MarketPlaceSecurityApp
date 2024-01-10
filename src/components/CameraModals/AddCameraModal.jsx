import axios from "axios";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isAddCameraModalState, latState, lngState } from "../../recoil/atoms";
import { handleError, handleSuccess } from "../../utils/globals.js";
import ClickableMap from "../ClickableMap";
import { api } from "../../services/api.js";

export default function AddCameraModal(props) {
  const [lat] = useRecoilState(latState);
  const [lng] = useRecoilState(lngState);
  const [isAddCameraModal, setIsAddCameraModal] = useRecoilState(
    isAddCameraModalState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // SEND FORMDATA TO BACKEND
  const onSubmit = async (formData) => {
    const cameraData = new FormData();
    cameraData.append("name", formData.cameraName);
    cameraData.append("url", formData.cameraUrl);
    cameraData.append("latitude", lat);
    cameraData.append("longitude", lng);
    cameraData.append("image", formData.cameraImage[0]);
    console.log(cameraData);
    try {
      const response = await api.post(`/api/cameras/`, cameraData, {});
      if (response.status === 201) {
        props.fetch();
        handleSuccess("Kamera muvaqqiyatli qo'shildi!");
        console.log(response);
        setIsAddCameraModal(false);
      } else if (response.status === 400) {
        console.log(400);
      } else {
        handleError("Kamera qo'shishda xatolik!");
      }
    } catch (error) {
      handleError("Serverga ulanib bo'lmadi!");
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50 blur -z-10"></div>
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-4/5 grid-cols-2 gap-20 p-20 text-white rounded shadow-lg bg-stone-900"
        >
          <div className="flex flex-col">
            <h1 className="mb-4 text-5xl text-center font-bebas">
              KAMERA QO`SHISH
            </h1>
            <div className="grid gap-10">
              {/* KAMERA NOMI */}
              <div>
                <span className="px-1 font-extrabold bg-lime-600">
                  KAMERA NOMI
                </span>
                <input
                  type="text"
                  {...register("cameraName", {
                    required: "Kamera nomi majburiy",
                    pattern: {
                      value: /^[A-Za-z_ '"`]+$/,
                      message: "Belgi ishlatish mumkin emas",
                    },
                  })}
                  className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
                />
                {errors.cameraName && (
                  <p className="text-red-500">{errors.cameraName.message}</p>
                )}
              </div>

              {/* KAMERA MANZILI */}
              <div>
                <span className="px-1 font-extrabold bg-lime-600">
                  KAMERA MANZILI
                </span>
                <input
                  type="text"
                  className="w-full p-3 bg-transparent border-2 outline-none appearance-none cursor-not-allowed border-lime-600"
                  value={`Latitude: ${lat}, Longitude: ${lng}`}
                  disabled
                  readOnly
                />
              </div>

              {/* JOY RASMI */}
              <div className="flex flex-col">
                <span className="w-32 px-1 mb-1 font-extrabold bg-lime-600">
                  JOY RASMI
                </span>
                <input
                  type="file"
                  className="p-3 border-2 border-lime-600"
                  {...register("cameraImage", {
                    required: "Kamera rasmi majburiy",
                  })}
                />
                {errors.cameraImage && (
                  <p className="text-red-500">{errors.cameraImage.message}</p>
                )}
              </div>

              {/* KAMERA URLI */}
              <div>
                <span className="px-1 font-extrabold bg-lime-600">
                  KAMERA URL
                </span>
                <input
                  type="text"
                  {...register("cameraUrl", {
                    required: "Kamera manzili majburiy",
                  })}
                  className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
                />
                {errors.cameraUrl && (
                  <p className="text-red-500">{errors.cameraUrl.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="grid content-between">
            <ClickableMap />

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-yellow-800 border-2 border-yellow-600"
                onClick={() => {
                  setIsAddCameraModal(false);
                }}
              >
                <i className="pr-2 fa-solid fa-xmark"></i> BEKOR QILISH
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-green-800 border-2 border-green-600"
              >
                <i className="pr-2 fa-solid fa-plus"></i> QO`SHISH
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

AddCameraModal.propTypes = {
  fetch: PropTypes.any.isRequired,
};
