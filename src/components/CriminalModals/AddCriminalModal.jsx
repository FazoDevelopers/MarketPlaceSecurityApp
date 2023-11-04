import { useRecoilState } from "recoil";
import { isAddCriminalModalState } from "../../recoil/atoms";
import axios from "axios";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { handleError, handleSuccess } from "../Notifications";

export default function AddCriminalModal(props) {
  const [isAddCriminalModal, setIsAddCriminalModal] = useRecoilState(
    isAddCriminalModalState
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // SEND FORMDATA TO BACKEND
  const onSubmit = async (formData) => {
    const cameraData = new FormData();
    cameraData.append("first_name", formData.criminalName);
    cameraData.append("last_name", formData.criminalSurname);
    cameraData.append("middle_name", formData.criminalFather);
    cameraData.append("age", formData.criminalAge);
    cameraData.append("description", formData.criminalDescription);
    cameraData.append("image", formData.criminalImage[0]);
    console.log(cameraData);
    try {
      const response = await axios.post(`/api/criminals/`, cameraData, {});
      if (response.status === 201) {
        props.fetch();
        handleSuccess("Jinoyatchi muvaffaqiyatli qo'shildi!");
        console.log(response);
        setIsAddCriminalModal(false);
      } else if (response.status === 400) {
        console.log(400);
      } else {
        handleError("Jinoyatchi qo'shishda xatolik!");
      }
    } catch (error) {
      handleError("Serverga ulanib bo'lmadi!");
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50 blur -z-10"></div>
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-stone-900 text-white p-20 rounded shadow-lg">
            <h1 className="font-bebas text-5xl text-center mb-4">
              JINOYATCHI QO`SHISH
            </h1>
            <div className="grid grid-cols-2 gap-20">
              <div>
                <div className="mb-5">
                  <span className="bg-lime-600 px-1 font-extrabold">
                    JINOYATCHI ISMI
                  </span>
                  <input
                    type="text"
                    {...register("criminalName", {
                      required: "Bo'sh bo'lishi mumkin emas",
                      pattern: {
                        value: /^[A-Za-z_ '"`]+$/,
                        message: "Faqat harflar kiritilishi kerak",
                      },
                    })}
                    className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                  />
                  {errors.criminalName && (
                    <span className="text-red-500">
                      {errors.criminalName.message}
                    </span>
                  )}
                </div>

                <div className="mb-5">
                  <span className="bg-lime-600 px-1 font-extrabold">
                    JINOYATCHI FAMILIYASI
                  </span>
                  <input
                    type="text"
                    {...register("criminalSurname", {
                      required: "Bo'sh bo'lishi mumkin emas",
                      pattern: {
                        value: /^[A-Za-z_ '"`]+$/,
                        message: "Faqat harflar kiritilishi kerak",
                      },
                    })}
                    className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                  />
                  {errors.criminalSurname && (
                    <span className="text-red-500">
                      {errors.criminalSurname.message}
                    </span>
                  )}
                </div>

                <div className="mb-5">
                  <span className="bg-lime-600 px-1 font-extrabold">
                    JINOYATCHI OTASI
                  </span>
                  <input
                    type="text"
                    {...register("criminalFather", {
                      required: "Bo'sh bo'lishi mumkin emas",
                      pattern: {
                        value: /^[A-Za-z_ '"`]+$/,
                        message: "Faqat harflar kiritilishi kerak",
                      },
                    })}
                    className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                  />
                  {errors.criminalFather && (
                    <span className="text-red-500">
                      {errors.criminalFather.message}
                    </span>
                  )}
                </div>

                <div className="mb-5">
                  <span className="bg-lime-600 px-1 font-extrabold">
                    JINOYATCHI YOSHI
                  </span>
                  <input
                    type="number"
                    {...register("criminalAge", {
                      required: "Bo'sh bo'lishi mumkin emas",
                      min: {
                        value: 18,
                        message:
                          "Jinoyat uchun minimum yoshi 18 bo'lishi kerak",
                      },
                      max: {
                        value: 100,
                        message:
                          "Jinoyat uchun maksimum yoshi 100 dan oshmasligi kerak",
                      },
                    })}
                    className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                  />
                  {errors.criminalAge && (
                    <span className="text-red-500">
                      {errors.criminalAge.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex flex-col mb-5">
                  <span className="bg-lime-600 px-1 font-extrabold w-28 mb-1">
                    JOY RASMI
                  </span>
                  <input
                    type="file"
                    {...register("criminalImage", {
                      required: "Bo'sh bo'lishi mumkin emas",
                      validate: {
                        sizeCheck: (value) => {
                          if (value[0]?.size > 1048576) {
                            return "Rasm hajmi 1MB dan oshmasligi kerak";
                          }
                          return true;
                        },
                      },
                    })}
                    className="border-2 border-lime-600 p-3"
                  />

                  {errors.criminalImage && (
                    <span className="text-red-500">
                      {errors.criminalImage.message}
                    </span>
                  )}
                </div>

                <div>
                  <span className="bg-lime-600 px-1 font-extrabold">
                    JINOYATCHI HAQIDA
                  </span>

                  <textarea
                    {...register("criminalDescription", {
                      required: "Bo'sh bo'lishi mumkin emas",
                    })}
                    id=""
                    cols="30"
                    rows="10"
                    className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                  ></textarea>
                  {errors.criminalDescription && (
                    <span className="text-red-500">
                      {errors.criminalDescription.message}
                    </span>
                  )}
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
                    type="submit"
                    className="bg-green-800 px-4 py-2 border-2 border-green-600"
                  >
                    <i className="fa-solid fa-plus pr-2"></i> QO`SHISH
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

AddCriminalModal.propTypes = {
  fetch: PropTypes.func.isRequired,
};
