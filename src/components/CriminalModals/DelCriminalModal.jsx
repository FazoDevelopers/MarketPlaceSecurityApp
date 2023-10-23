import React from "react";
import { useRecoilState } from "recoil";
import { isDelCriminalModalState } from "../../recoil/atoms";
import axios from "axios";
import { toast } from "react-toastify";

export default function DelCriminalModal(props) {
  const [isDelCriminalModal, setIsDelCriminalModal] = useRecoilState(
    isDelCriminalModalState
  );

  const delData = async (id) => {
    try {
      const response = await axios.delete(`/api/criminals/${id}/`);
      console.log(response);

      if (response.status === 204) {
        console.log(response);
        props.fetch();
        toast.success("Camera deleted successfully");
      } else {
        console.error("Request failed with status:", response.status);
        toast.error("Failed to delete the camera");
      }
    } catch (error) {
      console.error("delete:", error);
      toast.error("Failed to delete the camera");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black opacity-50 blur -z-10"></div>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-stone-900 text-white p-20 rounded shadow-lg w-1/3">
            <h1 className="font-bebas text-2xl text-center">
              #{props.data.first_name} {props.data.last_name}
            </h1>
            <h1 className="text-2xl text-center">
              Haqiqatdan o`chirishni xohlaysizmi?
            </h1>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-red-800 px-5 py-2"
                onClick={() => {
                  setIsDelCriminalModal(false);
                  delData(props.data.id);
                }}
              >
                <i className="fa-solid fa-trash"></i> O`CHIRISH
              </button>
              <button
                type="button"
                className="bg-yellow-800 px-4 py-2 border-2 border-yellow-600"
                onClick={() => {
                  setIsDelCriminalModal(false);
                }}
              >
                <i className="fa-solid fa-xmark pr-2"></i> BEKOR QILISH
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
