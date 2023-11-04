import { useForm } from "react-hook-form";
import axios from "axios";
import { isAddCameraModalState, latState, lngState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import ClickableMap from "../ClickableMap";
import PropTypes from "prop-types";
import { handleError, handleSuccess } from "../Notifications.js";

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
      const response = await axios.post(`/api/camera/`, cameraData, {});
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
                <input
                  type="text"
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
                  {...register("cameraImage", {
                    required: "Kamera rasmi majburiy",
                  })}
                />
                {errors.cameraImage && (
                  <p className="text-red-500">{errors.cameraImage.message}</p>
                )}
              </div>

              <div>
                <span className="bg-lime-600 px-1 font-extrabold">
                  KAMERA URL
                </span>
                <input
                  type="text"
                  {...register("cameraUrl", {
                    required: "Kamera manzili majburiy",
                  })}
                  className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
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

AddCameraModal.propTypes = {
  fetch: PropTypes.any.isRequired,
};
