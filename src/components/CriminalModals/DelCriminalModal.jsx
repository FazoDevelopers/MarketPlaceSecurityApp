import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { isDelCriminalModalState } from "../../recoil/atoms";
import { api } from "../../services/api";
import { handleError, handleSuccess } from "../../utils/globals";

export default function DelCriminalModal(props) {
  const [, setIsDelCriminalModal] = useRecoilState(
    isDelCriminalModalState
  );

  const delData = async (id) => {
    try {
      const response = await api.delete(`/api/criminals/${id}/`);
       

      if (response.status === 204) {
         
        props.fetch();
        handleSuccess("Jinoyatchi muvaffaqiyatli o'chirildi!");
      } else {
        console.error("Request failed with status:", response.status);
        handleError("Jinoyatchi o'chirishda xatolik!")
      }
    } catch (error) {
      console.error("delete:", error);
      handleError("Jinoyatchi o'chirishda xatolik!")
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black opacity-50 blur -z-10"></div>
        <div className="flex items-center justify-center h-screen">
          <div className="w-1/3 p-20 text-white rounded shadow-lg bg-stone-900">
            <h1 className="text-2xl text-center font-bebas">
              #{props.data.first_name} {props.data.last_name}
            </h1>
            <h1 className="text-2xl text-center">
              Haqiqatdan o`chirishni xohlaysizmi?
            </h1>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="px-5 py-2 bg-red-800"
                onClick={() => {
                  setIsDelCriminalModal(false);
                  delData(props.data.id);
                }}
              >
                <i className="fa-solid fa-trash"></i> O`CHIRISH
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-yellow-800 border-2 border-yellow-600"
                onClick={() => {
                  setIsDelCriminalModal(false);
                }}
              >
                <i className="pr-2 fa-solid fa-xmark"></i> BEKOR QILISH
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

DelCriminalModal.propTypes = {
  data: PropTypes.object.isRequired,
  fetch: PropTypes.func.isRequired,
};
