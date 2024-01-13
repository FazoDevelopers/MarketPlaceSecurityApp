import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  isAddCameraModalState,
  isDelCameraModalState,
  isUpCameraModalState,
} from "../../recoil/atoms";
import { api } from "../../services/api";
import {
  decreasePageIndex,
  handleError,
  increasePageIndex,
} from "../../utils/globals";
import AddCameraModal from "../CameraModals/AddCameraModal";
import DelCameraModal from "../CameraModals/DelCameraModal";
import UpCameraModal from "../CameraModals/UpCameraModal";
import ViewCameraCard from "../MainCards/ViewCameraCard";

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
  const [isUpCameraModal] = useRecoilState(isUpCameraModalState);
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
      const response = await api.get(
        `/api/cameras/?page=${indexPage}&search=${searchText}`
      );
      console.log(response.data);
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

  // useEffect for fetchData
  useEffect(() => {
    fetchData();
  }, [indexPage, searchText]);

  return (
    <>
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
        <div className="flex flex-col items-center justify-between md:flex-row">
          <h1 className="mb-4 text-4xl font-bebas md:text-6xl md:mb-0">
            KAMERALAR
          </h1>
          <div className="flex gap-5">
            <input
              type="search"
              onChange={debounce((e) => setSearchText(e.target.value), 1000)}
              className="p-2 bg-transparent border-2 outline-none border-lime-600"
              placeholder="Qidirish"
            />
            <button
              type="button"
              className="p-2 font-extrabold text-white bg-green-500 border-2 border-lime-600"
              onClick={() => {
                setIsAddCameraModal(true);
              }}
            >
              <i className="p-1 fa-sharp fa-solid fa-plus"></i> QO`SHISH
            </button>
          </div>
        </div>

        {/* MAPPING FETCH DATA */}
        {apiData.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          <div className="p-64 font-bold text-center text-gray-600 uppercase">
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
            onClick={debounce(
              () => decreasePageIndex(setIndexPage, prevPageStatus),
              1000
            )}
            disabled={!prevPageStatus}
          >
            <i className="fa-solid fa-chevron-left"></i> Oldingi
          </button>
          <button
            type="button"
            className={`${
              !nextPageStatus ? "bg-green-800" : "bg-green-500"
            } px-5 py-2 font-extrabold m-3`}
            onClick={debounce(
              () => increasePageIndex(setIndexPage, nextPageStatus),
              1000
            )}
            disabled={!nextPageStatus}
          >
            Keyingi <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
