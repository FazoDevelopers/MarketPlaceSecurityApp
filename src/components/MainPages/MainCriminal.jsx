import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  isAddCriminalModalState,
  isDelCriminalModalState,
  isUpCriminalModalState,
} from "../../recoil/atoms";
import { api } from "../../services/api";
import {
  decreasePageIndex,
  handleError,
  increasePageIndex,
} from "../../utils/globals";
import AddCriminalModal from "../CriminalModals/AddCriminalModal";
import DelCriminalModal from "../CriminalModals/DelCriminalModal";
import UpCriminalModal from "../CriminalModals/UpCriminalModal";
import ViewCriminalCard from "../MainCards/ViewCriminalCard";

export default function MainCriminal() {
  const [isAddCriminalModal, setIsAddCriminalModal] = useRecoilState(
    isAddCriminalModalState
  );
  const [isUpCriminalModal, setIsUpCriminalModal] = useRecoilState(
    isUpCriminalModalState
  );
  const [isDelCriminalModal, setIsDelCriminalModal] = useRecoilState(
    isDelCriminalModalState
  );
  const [data, setData] = useState([]);
  const [deleteCriminal, setDeleteCriminal] = useState(null);
  const [updateCriminal, setUpdateCriminal] = useState(null);
  const [indexPage, setIndexPage] = useState(1);
  const [nextPageStatus, setNextPageStatus] = useState("");
  const [prevPageStatus, setPrevPageStatus] = useState("");
  const [searchText, setSearchText] = useState("");

  const deleteCriminalData = (data) => {
    setDeleteCriminal(data);
    setIsDelCriminalModal(true);
  };

  const updateCriminalData = (data) => {
    setUpdateCriminal(data);
    setIsUpCriminalModal(true);
  };

  // fetch data from backend
  const fetchData = async () => {
    try {
      const response = await api.get(
        `/api/criminals/?page=${indexPage}&search=${searchText}`
      );
      console.log(indexPage);
      console.log(response.data);
      setData(response.data.results);
      setNextPageStatus(response.data.next);
      setPrevPageStatus(response.data.previous);
      if (response.status !== 200 && response.statusText !== "OK") {
        handleError("Ma'lumot yuklashda xatolik!");
      }
    } catch (error) {
      handleError("Serverga ulanib bo'lmadi!", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [indexPage, searchText]);

  return (
    <>
      {/* OPEN MODAL */}
      {isAddCriminalModal && <AddCriminalModal fetch={fetchData} />}
      {isUpCriminalModal && (
        <UpCriminalModal fetch={fetchData} data={updateCriminal} />
      )}
      {isDelCriminalModal && (
        <DelCriminalModal fetch={fetchData} data={deleteCriminal} />
      )}

      <div className="container mx-auto text-white">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <h1 className="mb-4 text-4xl font-bebas md:text-6xl md:mb-0">
            JINOYATCHILAR
          </h1>

          <div className="flex gap-5">
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              className="p-2 bg-transparent border-2 outline-none border-lime-600"
              placeholder="Qidirish"
            />
            <button
              type="button"
              className="p-2 font-extrabold text-white bg-green-500 border-2 border-lime-600"
              onClick={() => {
                setIsAddCriminalModal(true);
              }}
            >
              <i className="p-1 fa-sharp fa-solid fa-plus"></i>
              QO`SHISH
            </button>
          </div>
        </div>

        {/* MAP FETCH DATA */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.map((item) => {
              return (
                <ViewCriminalCard
                  key={item.id}
                  data={item}
                  deleteData={deleteCriminalData}
                  updateData={updateCriminalData}
                />
              );
            })}
          </div>
        ) : (
          <div className="p-64 font-bold text-center text-gray-600 uppercase">
            <h1 className="text-8xl">Bo`sh</h1>
            <h1 className="text-3xl font-bold">Jinoyatchi mavjud emas</h1>
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
