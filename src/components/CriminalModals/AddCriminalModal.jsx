import { useRecoilState } from "recoil";
import { isAddCriminalModalState } from "../../recoil/atoms";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../../config";
import { useForm } from "react-hook-form";

export default function AddCriminalModal(props) {
  const [isAddCriminalModal, setIsAddCriminalModal] = useRecoilState(
    isAddCriminalModalState
  );

  // ADD SUCCESS NOTIFICATION
  const handleSuccess = () => {
    toast.success("Kamera muvafaqqiyatli qo'shildi!", toastOptions);
  };

  // ADD ERROR NOTIFICATION
  const handleError = (error) => {
    console.error("Error:", error);
    toast.error("Kamera qo'shishda xatolik!", toastOptions);
  };

  const { handleSubmit, register, errors } = useForm();

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
        handleSuccess();
        console.log(response);
        setIsAddCriminalModal(false);
      } else if (response.status === 400) {
        console.log(400);
      } else {
        handleError(response.statusText);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black opacity-50 blur -z-10"></div>
        <div className="flex items-center justify-center h-screen">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-stone-900 text-white p-20 rounded shadow-lg w-4/5 grid grid-cols-2 gap-20">
              <div className="flex flex-col">
                <h1 className="font-bebas text-5xl text-center mb-4">
                  JINOYATCHI QO`SHISH
                </h1>
                <div className="grid gap-10">
                  <div>
                    <span className="bg-lime-600 px-1 font-extrabold">
                      JINOYATCHI ISMI
                    </span>
                    <input
                      type="text"
                      {...register("criminalName", { required: true })}
                      className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                    />
                  </div>

                  <div>
                    <span className="bg-lime-600 px-1 font-extrabold">
                      JINOYATCHI FAMILIYASI
                    </span>
                    <input
                      {...register("criminalSurname", { required: true })}
                      type="text"
                      className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                    />
                  </div>

                  <div>
                    <span className="bg-lime-600 px-1 font-extrabold">
                      JINOYATCHI OTASI
                    </span>
                    <input
                      type="text"
                      {...register("criminalFather", { required: true })}
                      className="border-2 border-lime-600 w-full bg-transparent p-3 outline-none"
                    />
                  </div>

                  <div>
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
              </div>

              <div className="grid content-between">
                <div className="flex flex-col">
                  <span className="bg-lime-600 px-1 font-extrabold w-32 mb-1">
                    JOY RASMI
                  </span>
                  <input
                    type="file"
                    {...register("criminalImage", { required: true })}
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
          </form>
        </div>
      </div>
    </>
  );
}
