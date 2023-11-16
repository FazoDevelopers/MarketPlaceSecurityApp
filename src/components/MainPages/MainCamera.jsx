import { useState, useEffect } from "react";
import ViewCameraCard from "../MainCards/ViewCameraCard";
import AddCameraModal from "../CameraModals/AddCameraModal";
import UpCameraModal from "../CameraModals/UpCameraModal";
import DelCameraModal from "../CameraModals/DelCameraModal";
import axios from "axios";
import {
  isAddCameraModalState,
  isDelCameraModalState,
  isUpCameraModalState,
} from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { decreasePageIndex, handleError, increasePageIndex } from "../globals";

export default function MainCamera() {
  const [upCamDatas, setUpCamDatas] = useState(null);
  const [delCamDatas, setDelCamDatas] = useState(null);
  const [indexPage, setIndexPage] = useState(1);
  const [nextPageStatus, setNextPageStatus] = useState(null);
  const [prevPageStatus, setPrevPageStatus] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [isAddCameraModal, setIsAddCameraModal] = useRecoilState(
    isAddCameraModalState
  );
  const [isUpCameraModal, setIsUpCameraModal] =
    useRecoilState(isUpCameraModalState);
  const [isDelCameraModal, setIsDelCameraModal] = useRecoilState(
    isDelCameraModalState
  );

  const upCameraDatas = (data) => {
    setUpCamDatas(data);
  };

  const deleteCamera = (data) => {
    setDelCamDatas(data);
    setIsDelCameraModal(true);
  };

  // fetch camera data from API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/camera/?page=${indexPage}&search=${searchText}`
      );
      if (response.status === 200) {
        setApiData(response.data.results);
        setNextPageStatus(response.data.next);
        setPrevPageStatus(response.data.previous);
      } else {
        handleError("Ma'lumot yuklashda xatolik!");
      }
    } catch (error) {
      handleError("Serverga ulanib bo'lmadi!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [indexPage, searchText]);

  return (
    <>
      {/* MODAL OPEN CHECK */}
      {isAddCameraModal && (
        <AddCameraModal fetch={fetchData} pageIndex={indexPage} />
      )}
      {isUpCameraModal && (
        <UpCameraModal fetch={fetchData} upCamDatas={upCamDatas} />
      )}
      {isDelCameraModal && (
        <DelCameraModal
          fetch={fetchData}
          data={delCamDatas}
          setIsDelCameraModal={setIsDelCameraModal}
        />
      )}

      <div className="container mx-auto text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="font-bebas text-4xl md:text-6xl mb-4 md:mb-0">
            KAMERALAR
          </h1>
          <div className="flex gap-5">
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              className="border-2 border-lime-600 bg-transparent p-2 outline-none"
              placeholder="Qidirish"
            />
            <button
              type="button"
              className="p-2 bg-green-500 text-white font-extrabold border-2 border-lime-600"
              onClick={() => {
                setIsAddCameraModal(true);
              }}
            >
              <i className="fa-sharp fa-solid fa-plus p-1"></i>
              QO`SHISH
            </button>
          </div>
        </div>

        {/* MAPPING FETCH DATA */}
        {apiData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {apiData.map((item, index) => (
              <ViewCameraCard
                key={index}
                data={item}
                upCameraDatas={upCameraDatas}
                deleteCamera={deleteCamera}
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-64 text-gray-600 uppercase font-bold">
            <h1 className="text-8xl">Bo`sh</h1>
            <h1 className="text-3xl font-bold">Kamera mavjud emas</h1>
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center my-5">
          <button
            type="button"
            className={`${
              !prevPageStatus ? "bg-green-800" : "bg-green-500"
            } px-5 py-2 font-extrabold m-3`}
            onClick={() => decreasePageIndex(setIndexPage, prevPageStatus)}
            disabled={!prevPageStatus}
          >
            <i className="fa-solid fa-chevron-left"></i> Oldingi
          </button>

          <button
            type="button"
            className={`${
              !nextPageStatus ? "bg-green-800" : "bg-green-500"
            } px-5 py-2 font-extrabold m-3`}
            onClick={() => increasePageIndex(setIndexPage, nextPageStatus)}
            disabled={!nextPageStatus}
          >
            Keyingi <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
