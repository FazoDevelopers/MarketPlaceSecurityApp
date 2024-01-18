import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isUpCriminalModalState, latState, lngState } from "../../recoil/atoms";
import { handleError, handleSuccess } from "../../utils/globals";
import { api } from "../../services/api";
import { useState } from "react";
import PropTypes from "prop-types"

export default function UpCriminalModal(props) {
  const [lat, setLat] = useRecoilState(latState);
  const [lng, setLng] = useRecoilState(lngState);
  const [criminalImg, setCriminalImg] = useState(null);
  const [isUpCriminalModal, setIsUpCriminalModal] = useRecoilState(
    isUpCriminalModalState
  );

  const { handleSubmit, register, errors } = useForm({
    defaultValues: {
      criminalName: props.data.first_name,
      criminalSurname: props.data.last_name,
      criminalFather: props.data.middle_name,
      criminalAge: props.data.age,
      criminalDescription: props.data.description,
      criminalImage: props.data.image_url,
    },
  });

  // SEND FORMDATA TO BACKEND
  const onSubmit = async (formData) => {
    const criminalData = new FormData();
    criminalData.append("first_name", formData.criminalName);
    criminalData.append("last_name", formData.criminalSurname);
    criminalData.append("middle_name", formData.criminalFather);
    criminalData.append("age", formData.criminalAge);
    criminalData.append("description", formData.criminalDescription);
    if (criminalImg) {
      criminalData.append("image", criminalImg);
    }

    try {
      const response = await api.patch(
        `/api/criminals/${props.data.id}/`,
        criminalData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.statusText === "OK") {
        props.fetch();
        handleSuccess("Jinoyatchi muvaffaqiyatli tahrirlandi!");
        setIsUpCriminalModal(false);
      } else if (response.status === 400) {
        console.log(400);
      } else {
        handleError("Jinoyatchi tahrirlashda xatolik!");
      }
    } catch (error) {
      handleError("Jinoyatchi tahrirlashda xatolik!");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black opacity-50 blur -z-10"></div>
        <div className="flex items-center justify-center h-screen">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-20 text-white rounded shadow-lg bg-stone-900">
              <h1 className="mb-4 text-5xl text-center font-bebas">
                JINOYATCHI TAHRIRLASH
              </h1>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <div className="mb-5">
                    <span className="px-1 font-extrabold bg-lime-600">
                      JINOYATCHI ISMI
                    </span>
                    <input
                      type="text"
                      {...register("criminalName", { required: true })}
                      className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
                    />
                  </div>

                  <div className="mb-5">
                    <span className="px-1 font-extrabold bg-lime-600">
                      JINOYATCHI FAMILIYASI
                    </span>
                    <input
                      {...register("criminalSurname", { required: true })}
                      type="text"
                      className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
                    />
                  </div>

                  <div className="mb-5">
                    <span className="px-1 font-extrabold bg-lime-600">
                      JINOYATCHI OTASI
                    </span>
                    <input
                      type="text"
                      {...register("criminalFather", { required: true })}
                      className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
                    />
                  </div>

                  <div className="mb-5">
                    <span className="px-1 font-extrabold bg-lime-600">
                      JINOYATCHI YOSHI
                    </span>
                    <input
                      type="text"
                      {...register("criminalAge", { required: true })}
                      className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex flex-col mb-5">
                    <span className="w-32 px-1 mb-1 font-extrabold bg-lime-600">
                      JOY RASMI
                    </span>
                    <input
                      type="file"
                      onChange={(e) => {
                        setCriminalImg(e.target.files[0]);
                      }}
                      className="p-3 border-2 border-lime-600"
                    />
                  </div>

                  <div>
                    <span className="px-1 font-extrabold bg-lime-600">
                      JINOYATCHI HAQIDA
                    </span>

                    <textarea
                      {...register("criminalDescription", { required: true })}
                      id=""
                      cols="30"
                      rows="10"
                      className="w-full p-3 bg-transparent border-2 outline-none border-lime-600"
                    ></textarea>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-yellow-800 border-2 border-yellow-600"
                      onClick={() => {
                        setIsUpCriminalModal(false);
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
          </form>
        </div>
      </div>
    </>
  );
}

UpCriminalModal.propTypes = {
  data: PropTypes.object,
  fetch: PropTypes.func,
};