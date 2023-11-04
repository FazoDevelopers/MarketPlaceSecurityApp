import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { isUpCriminalModalState, latState, lngState } from "../../recoil/atoms";
import { useForm } from "react-hook-form";
import axios from "axios";
import { handleError, handleSuccess } from "../Notifications";

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

    console.log(formData);
    console.log(criminalData);
    try {
      const response = await axios.patch(
        `/api/criminals/${props.data.id}/`,
        criminalData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.statusText === "OK") {
        props.fetch();
        handleSuccess("Jinoyatchi muvaffaqiyatli tahrirlandi!");
        console.log(response);
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
            <div className="bg-stone-900 text-white p-20 rounded shadow-lg">
              <h1 className="font-bebas text-5xl text-center mb-4">
                JINOYATCHI TAHRIRLASH
              </h1>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <div className="mb-5">
                    <span className="bg-lime-600 px-1 font-extrabold">
                      JINOYATCHI ISMI
                    </span>
                    <input
                      type="text"
                      {...register("criminalName", { required: true })}
                      className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                    />
                  </div>

                  <div className="mb-5">
                    <span className="bg-lime-600 px-1 font-extrabold">
                      JINOYATCHI FAMILIYASI
                    </span>
                    <input
                      {...register("criminalSurname", { required: true })}
                      type="text"
                      className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                    />
                  </div>

                  <div className="mb-5">
                    <span className="bg-lime-600 px-1 font-extrabold">
                      JINOYATCHI OTASI
                    </span>
                    <input
                      type="text"
                      {...register("criminalFather", { required: true })}
                      className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                    />
                  </div>

                  <div className="mb-5">
                    <span className="bg-lime-600 px-1 font-extrabold">
                      JINOYATCHI YOSHI
                    </span>
                    <input
                      type="text"
                      {...register("criminalAge", { required: true })}
                      className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex flex-col mb-5">
                    <span className="bg-lime-600 px-1 font-extrabold w-32 mb-1">
                      JOY RASMI
                    </span>
                    <input
                      type="file"
                      onChange={(e) => {
                        setCriminalImg(e.target.files[0]);
                      }}
                      className="border-2 border-lime-600 p-3"
                    />
                  </div>

                  <div>
                    <span className="bg-lime-600 px-1 font-extrabold">
                      JINOYATCHI HAQIDA
                    </span>

                    <textarea
                      {...register("criminalDescription", { required: true })}
                      id=""
                      cols="30"
                      rows="10"
                      className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className="bg-yellow-800 px-4 py-2 border-2 border-yellow-600"
                      onClick={() => {
                        setIsUpCriminalModal(false);
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
    </>
  );
}
