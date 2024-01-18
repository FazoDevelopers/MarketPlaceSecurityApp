import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isUpCameraModalState, latState, lngState } from "../../recoil/atoms";
import { api } from "../../services/api.js";
import { handleError, handleSuccess } from "../../utils/globals.js";
import UpClickableMap from "../UpClickableMap";

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

  // SEND FORMDATA TO BACKEND
  const onSubmit = async (formData) => {
    const data = new FormData();
    data.append("name", formData.cameraName);
    data.append("url", formData.cameraUrl);
    data.append("latitude", lat);
    data.append("longitude", lng);
    data.append("image", formData.cameraImage[0]);

    console.log(data);
    try {
      const response = await api.patch(
        `/api/camera/${props.upCamDatas.id}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        props.fetch();
        handleSuccess("Kamera muvafaqqiyatli tahrirlandi!");
      } else {
        handleError("Kamera tahrirlanishda xatolik!");
      }
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
          <div className="grid w-4/5 grid-cols-2 gap-20 p-20 text-white rounded shadow-lg bg-stone-900">
            <div className="flex flex-col">
              <h1 className="mb-4 text-5xl text-center font-bebas">
                #{props.upCamDatas.name} TAHRIRLASH
              </h1>
              {/* KAMERA NOMI */}
              <div className="mb-5">
                <span className="px-1 font-extrabold bg-lime-600">
                  KAMERA NOMI
                </span>
                <input
                  type="text"
                  defaultValue={props.upCamDatas.name}
                  {...register("cameraName", {
                    required: "Kamera nomi majburiy",
                  })}
                  className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
                />
                {errors.cameraName && (
                  <p className="text-red-500">{errors.cameraName.message}</p>
                )}
              </div>

              {/* KAMERA URLI */}
              <div className="mb-5">
                <span className="px-1 font-extrabold bg-lime-600">
                  KAMERA URL
                </span>
                <input
                  type="text"
                  defaultValue={props.upCamDatas.url}
                  {...register("cameraUrl", {
                    required: "Kamera manzili majburiy",
                  })}
                  className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
                />
                {errors.cameraUrl && (
                  <p className="text-red-500">{errors.cameraUrl.message}</p>
                )}
              </div>

              {/* JOY RASMI */}
              <div className="flex flex-col">
                <span className="w-32 px-1 mb-1 font-extrabold bg-lime-600">
                  JOY RASMI
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="p-3 border-2 border-lime-600"
                  {...register("cameraImage", {
                    required: "Bo'sh bo'lishi mumkin emas",
                    validate: {
                      sizeCheck: (value) => {
                        if (value[0]?.size > 10485760) {
                          return "Rasm hajmi 10MB dan oshmasligi kerak";
                        }
                        return true;
                      },
                    },
                  })}
                  {...(errors.cameraName && (
                    <p className="text-red-500">{errors.cameraName.message}</p>
                  ))}
                />
              </div>
            </div>

            <div className="grid content-between">
              <UpClickableMap upCameraData={props.upCamDatas} />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-yellow-800 border-2 border-yellow-600"
                  onClick={() => {
                    setIsUpCameraModal(false);
                  }}
                >
                  <i className="pr-2 fa-solid fa-xmark"></i> BEKOR QILISH
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-800 border-2 border-green-600"
                >
                  <i className="pr-2 fa-solid fa-plus"></i> TAHRIRLASH
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
