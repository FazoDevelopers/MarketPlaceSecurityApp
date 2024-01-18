import PropTypes from "prop-types";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";
import { isDelCameraModalState } from "../../recoil/atoms";
import { api } from "../../services/api";
import { handleError, handleSuccess } from "../../utils/globals";

export default function DelCameraModal(props) {
  const [, setIsDelCameraModal] = useRecoilState(isDelCameraModalState);
  const [, setDelCardIndex] = useState();

  // DELETE CAMERA DATA FROM API
  const delData = async () => {
    try {
      const response = await api.delete(`/api/camera/${props.data.id}/`);
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
          <div className="w-1/3 p-20 text-white rounded shadow-lg bg-stone-900">
            <h1 className="text-4xl text-center font-bebas">
              #{props.data.name}
            </h1>
            <h1 className="text-2xl text-center">
              Haqiqatdan o`chirishni xohlaysizmi?
            </h1>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-yellow-800 border-2 border-yellow-600"
                onClick={() => {
                  setIsDelCameraModal(false);
                }}
              >
                <i className="pr-2 fa-solid fa-xmark"></i> BEKOR QILISH
              </button>

              <button
                type="button"
                className="px-5 py-2 bg-red-800"
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
