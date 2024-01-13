import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isAddCriminalModalState } from "../../recoil/atoms";
import { api } from "../../services/api";
import { handleError, handleSuccess } from "../../utils/globals";

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
    const data = new FormData();
    data.append("first_name", formData.criminalName);
    data.append("last_name", formData.criminalSurname);
    data.append("middle_name", formData.criminalFather);
    data.append("age", formData.criminalAge);
    data.append("description", formData.criminalDescription);
    data.append("image", formData.criminalImage[0]);
    console.log(data);
    try {
      const response = await api.post(`/api/criminals/`, data, {});
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
          <div className="p-20 text-white rounded shadow-lg bg-stone-900">
            <h1 className="mb-4 text-5xl text-center font-bebas">
              JINOYATCHI QO`SHISH
            </h1>
            <div className="grid grid-cols-2 gap-20">
              <div>
                {/* CRIMINAL NAME */}
                <div className="mb-5">
                  <span className="px-1 font-extrabold bg-lime-600">
                    JINOYATCHI ISMI
                  </span>
                  <input
                    type="text"
                    {...register("criminalName", {
                      required: "Bo'sh bo'lishi mumkin emas",
                    })}
                    className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
                  />
                  {errors.criminalName && (
                    <span className="text-red-500">
                      {errors.criminalName.message}
                    </span>
                  )}
                </div>

                {/* CRIMINAL SURNAME */}
                <div className="mb-5">
                  <span className="px-1 font-extrabold bg-lime-600">
                    JINOYATCHI FAMILIYASI
                  </span>
                  <input
                    type="text"
                    {...register("criminalSurname", {
                      required: "Bo'sh bo'lishi mumkin emas",
                    })}
                    className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
                  />
                  {errors.criminalSurname && (
                    <span className="text-red-500">
                      {errors.criminalSurname.message}
                    </span>
                  )}
                </div>

                {/* CRIMINAL FATHER'S NAME */}
                <div className="mb-5">
                  <span className="px-1 font-extrabold bg-lime-600">
                    JINOYATCHI OTASI
                  </span>
                  <input
                    type="text"
                    {...register("criminalFather", {
                      required: "Bo'sh bo'lishi mumkin emas",
                    })}
                    className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
                  />
                  {errors.criminalFather && (
                    <span className="text-red-500">
                      {errors.criminalFather.message}
                    </span>
                  )}
                </div>

                {/* CRIMINAL AGE */}
                <div className="mb-5">
                  <span className="px-1 font-extrabold bg-lime-600">
                    JINOYATCHI YOSHI
                  </span>
                  <input
                    type="number"
                    {...register("criminalAge", {
                      required: "Bo'sh bo'lishi mumkin emas",
                      min: {
                        value: 1,
                        message: "Jinoyat uchun minimum yoshi 1 bo'lishi kerak",
                      },
                      max: {
                        value: 200,
                        message:
                          "Jinoyat uchun maksimum yoshi 200 dan oshmasligi kerak",
                      },
                    })}
                    className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
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
                  <span className="px-1 mb-1 font-extrabold bg-lime-600 w-28">
                    JOY RASMI
                  </span>
                  <input
                    type="file"
                    {...register("criminalImage", {
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
                    className="p-3 border-2 border-lime-600"
                  />
                  {errors.criminalImage && (
                    <span className="text-red-500">
                      {errors.criminalImage.message}
                    </span>
                  )}
                </div>

                <div>
                  <span className="px-1 font-extrabold bg-lime-600">
                    JINOYATCHI HAQIDA
                  </span>
                  <textarea
                    {...register("criminalDescription", {
                      required: "Bo'sh bo'lishi mumkin emas",
                    })}
                    id=""
                    cols="30"
                    rows="10"
                    className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
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
                    className="px-4 py-2 bg-yellow-800 border-2 border-yellow-600"
                    onClick={() => {
                      setIsAddCriminalModal(false);
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
