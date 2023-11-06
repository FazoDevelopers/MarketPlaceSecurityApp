import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isDelCameraModalState } from "../../recoil/atoms";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import { handleError, handleSuccess } from "../Notifications";

export default function DelCameraModal(props) {
  const [isDelCameraModal, setIsDelCameraModal] = useRecoilState(
    isDelCameraModalState
  );
  const [delCardIndex, setDelCardIndex] = useState();

  // DELETE CAMERA DATA FROM API
  const delData = async () => {
    try {
      const response = await axios.delete(`/api/camera/${props.data.id}/`);
      console.log(response);

      if (response.status === 204) {
        console.log(response);
        props.fetch();
        handleSuccess("Kamera muvaffaqiyatli o'chirildi!");
      } else {
        console.error("Request failed with status:", response.status);
        handleError("Kamera o'chirishda xatolik!");
      }
    } catch (error) {
      console.error("delete:", error);
      setIsDelCameraModal(true);
      handleError("Serverga ulanib bo'lmadi!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black opacity-50 blur -z-10"></div>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-stone-900 text-white p-20 rounded shadow-lg w-1/3">
            <h1 className="font-bebas text-4xl text-center">
              #{props.data.name}
            </h1>
            <h1 className="text-2xl text-center">
              Haqiqatdan o`chirishni xohlaysizmi?
            </h1>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-yellow-800 px-4 py-2 border-2 border-yellow-600"
                onClick={() => {
                  setIsDelCameraModal(false);
                }}
              >
                <i className="fa-solid fa-xmark pr-2"></i> BEKOR QILISH
              </button>

              <button
                type="button"
                className="bg-red-800 px-5 py-2"
                onClick={() => {
                  setDelCardIndex(props.data.id);
                  setIsDelCameraModal(false);
                  delData();
                }}
              >
                <i className="fa-solid fa-trash"></i> O`CHIRISH
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

DelCameraModal.propTypes = {
  data: PropTypes.object.isRequired,
  fetch: PropTypes.func.isRequired,
};
