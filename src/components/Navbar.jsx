import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { handleError } from "../utils/globals";

export default function Navbar() {
  const [kalit, setKalit] = useState("");

  const keyGenerate = async () => {
    try {
      const response = await api.get("android/auth/token/");
      setKalit(response.data.token);
    } catch (err) {
      handleError("Generatsiyada xatolik!");
    }
  };

  const handleKeyGenerateClick = () => {
    keyGenerate();
  };

  return (
    <div className="sticky top-0 z-50 bg-black navbar_wrapper">
      <div className="container flex flex-wrap items-center max-w-screen-lg p-4 mx-auto justify-evenly">
        <Link
          to="/home"
          className="flex items-center w-full px-3 py-2 mb-4 font-extrabold text-white border-8 border-gray-400 md:mb-0 md:w-auto"
        >
          <i className="pr-3 fa-sharp fa-solid fa-house"></i>
          <p className=" text-basis">BOSH SAHIFA</p>
        </Link>
        <Link
          to="/camera"
          className="flex items-center w-full px-3 py-2 mb-4 font-extrabold text-white border-8 border-gray-400 md:mb-0 md:w-auto"
        >
          <i className="pr-3 fa-solid fa-camera-cctv"></i>
          <p className="text-basis">KAMERALAR</p>
        </Link>
        <Link
          to="/criminal"
          className="flex items-center w-full px-3 py-2 mb-4 font-extrabold text-white border-8 border-gray-400 md:mb-0 md:w-auto"
        >
          <i className="pr-3 fa-sharp fa-solid fa-user-secret"></i>
          <p className="text-basis">HUQUQBUZARLAR</p>
        </Link>
        <Link
          to="/search"
          className="flex items-center w-full px-3 py-2 font-extrabold text-white border-8 border-gray-400 md:w-auto"
        >
          <i className="pr-3 fa-sharp fa-solid fa-magnifying-glass"></i>
          <p className="text-basis">QIDIRISH</p>
        </Link>
        <button
          type="button"
          className="px-5 text-white"
          title="Kalit generatsiya qilish"
          onClick={handleKeyGenerateClick}
        >
          <i className="fas fa-key fa-2x"></i>
        </button>

        {kalit ? (
          <p className="mt-3 text-white">
            <b>Yangi kalit:</b> {kalit}
          </p>
        ) : null}
      </div>
    </div>
  );
}
