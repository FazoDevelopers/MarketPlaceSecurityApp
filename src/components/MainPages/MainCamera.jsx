import React, { useState, useEffect } from "react";
import ViewCameraCard from "../MainCards/ViewCameraCard";
import AddCameraModal from "../CameraModals/AddCameraModal";
import {
  isAddCameraModalState,
  isDelCameraModalState,
  isUpCameraModalState,
} from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import UpCameraModal from "../CameraModals/UpCameraModal";
import DelCameraModal from "../CameraModals/DelCameraModal";
import { MAIN_URL } from "../../variables"; // Import MAIN_URL from your variables.js file
import axios from "axios"; // Import Axios

export default function MainCamera() {
  const [isAddCameraModal, setIsAddCameraModal] = useRecoilState(
    isAddCameraModalState
  );
  const [isUpCameraModal, setIsUpCameraModal] =
    useRecoilState(isUpCameraModalState);
  const [isDelCameraModal, setIsDelCameraModal] = useRecoilState(
    isDelCameraModalState
  );
  const [upCamDatas, setUpCamDatas] = useState(null);
  const [indexPage, setIndexPage] = useState(1);
  const [nextPageStatus, setNextPageStatus] = useState("");
  const [prevPageStatus, setPrevPageStatus] = useState("");

  const decreasePageIndex = () => {
    if (prevPageStatus) {
      setIndexPage((prev) => prev - 1);
    }
  };

  const increasePageIndex = () => {
    if (nextPageStatus) {
      setIndexPage((prev) => prev + 1);
    }
  };

  console.log(indexPage);

  const upCameraDatas = (data) => {
    setUpCamDatas(data);
  };
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${MAIN_URL}/api/camera/?page=${indexPage}`
        );
        if (response.status === 200) {
          setApiData(response.data.results);
          setNextPageStatus(response.data.next);
          setPrevPageStatus(response.data.previous);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [indexPage]);

  return (
    <>
      {isAddCameraModal && <AddCameraModal pageIndex={indexPage} />}
      {isUpCameraModal && <UpCameraModal upCamDatas={upCamDatas} />}
      {isDelCameraModal && <DelCameraModal />}

      <div className="container mx-auto text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="font-bebas text-4xl md:text-6xl mb-4 md:mb-0">
            KAMERALAR
          </h1>
          <button
            type="button"
            className="p-2 bg-green-500 text-white font-extrabold"
            onClick={() => {
              setIsAddCameraModal(true);
            }}
          >
            <i className="fa-sharp fa-solid fa-plus p-1"></i>
            QO`SHISH
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {apiData.map((item) => (
            <ViewCameraCard
              key={item.id}
              data={item}
              upCameraDatas={upCameraDatas}
            />
          ))}
        </div>

        <div className="flex justify-center my-5">
          <button
            type="button"
            className={`${
              !prevPageStatus ? "bg-green-800" : "bg-green-500"
            } px-5 py-2 font-extrabold m-3`}
            onClick={decreasePageIndex}
            disabled={!prevPageStatus}
          >
            <i className="fa-solid fa-chevron-left"></i> Oldingi
          </button>

          <button
            type="button"
            className={`${
              !nextPageStatus ? "bg-green-800" : "bg-green-500"
            } px-5 py-2 font-extrabold m-3`}
            onClick={increasePageIndex}
            disabled={!nextPageStatus}
          >
            Keyingi <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
