import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  isAddCriminalModalState,
  isDelCriminalModalState,
  isUpCriminalModalState,
} from "../../recoil/atoms";
import AddCriminalModal from "../CriminalModals/AddCriminalModal";
import DelCriminalModal from "../CriminalModals/DelCriminalModal";
import UpCriminalModal from "../CriminalModals/UpCriminalModal";
import ViewCriminalCard from "../MainCards/ViewCriminalCard";
import axios from "axios";
import { useForm } from "react-hook-form";

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
  console.log(deleteCriminal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      const response = await axios.get(
        "http://192.168.1.132:8000/api/criminals/"
      );
      console.log(response.data.results);
      setData(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isAddCriminalModal && <AddCriminalModal fetch={fetchData} />}
      {isUpCriminalModal && (
        <UpCriminalModal fetch={fetchData} data={updateCriminal} />
      )}
      {isDelCriminalModal && (
        <DelCriminalModal fetch={fetchData} data={deleteCriminal} />
      )}

      <div className="container mx-auto text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="font-bebas text-4xl md:text-6xl mb-4 md:mb-0">
            JINOYATCHILAR
          </h1>

          <div className="flex gap-5">
            <div className="h-11">
              <input
                type="text"
                {...register("criminalSearch")}
                className="border-2 border-lime-600 bg-transparent p-2 outline-none"
                placeholder="Qidirish"
              />
              <input
                type="datetime-local"
                {...register("searchFromDate")}
                className="border-2 border-lime-600 bg-transparent p-2 outline-none"
              />
              <input
                type="datetime-local"
                {...register("searchToDate")}
                className="border-2 border-lime-600 bg-transparent p-2 outline-none"
              />
              <button className="p-2 bg-green-600 text-white font-extrabold border-2 border-green-600">
                <i className="fas fa-search"></i>
                QIDIRISH
              </button>
            </div>

            <button
              type="button"
              className="p-2 bg-green-500 text-white font-extrabold border-2 border-lime-600"
              onClick={() => {
                setIsAddCriminalModal(true);
              }}
            >
              <i className="fa-sharp fa-solid fa-plus p-1"></i>
              QO`SHISH
            </button>
          </div>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
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
          <div className="text-center p-64 text-gray-600 uppercase font-bold">
            <h1 className="text-8xl">Bo`sh</h1>
            <h1 className="text-3xl font-bold">Jinoyatchi mavjud emas</h1>
          </div>
        )}

        <div className="flex justify-center my-5">
          <button
            type="button"
            className="bg-green-800 px-5 py-2 font-extrabold m-3"
          >
            <i className="fa-solid fa-chevron-left"></i> OLDINGI
          </button>
          <button
            type="button"
            className="bg-green-500 px-5 py-2 font-extrabold m-3"
          >
            KEYINGI <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
