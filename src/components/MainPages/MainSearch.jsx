import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import {
  decreasePageIndex,
  handleError,
  increasePageIndex,
} from "../../utils/globals";
import SearchCriminalCard from "../MainCards/SearchCriminalCard";

export default function MainSearch() {
  const [data, setData] = useState(null);
  const [indexPage, setIndexPage] = useState(1);
  const [nextPageStatus, setNextPageStatus] = useState(null);
  const [prevPageStatus, setPrevPageStatus] = useState(null);
  const { register, handleSubmit, getValues, reset } = useForm();
  const criminalSearch = useRef();

  const handleSearch = useMemo(() => {
    return async () => {
      const formData = getValues(); // Get current form data
      const params = new URLSearchParams({
        date_recorded__gte: formData.searchFromDate,
        date_recorded__lte: formData.searchToDate,
        page: indexPage,
      }).toString();

      console.log(formData.searchToDate);
      try {
        const response = await api.get(
          `/api/records/?search=${criminalSearch.current.value}&${params}`
        );
        console.log(response.data);
        setData(response.data.results);
        setNextPageStatus(response.data.next);
        setPrevPageStatus(response.data.previous);
        if (response.status !== 200 && response.statusText !== "OK") {
          handleError("Ma'lumot yuklashda xatolik!");
        }
      } catch (error) {
        handleError("Serverga ulanib bo'lmadi!");
      }
    };
  }, [getValues, indexPage]);

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <div className="container flex justify-between mx-auto text-white">
        <h1 className="mb-4 text-4xl font-bebas md:text-6xl md:mb-0">
          QIDIRUV
        </h1>
        <form onSubmit={handleSubmit(handleSearch)}>
          <div>
            <input
              type="text"
              {...register("criminalSearch")}
              onChange={debounce((e) => handleSearch(e), 1000)}
              ref={criminalSearch}
              className="p-2 bg-transparent border-2 outline-none border-lime-600"
              placeholder="Qidirish"
            />
            <input
              type="datetime-local"
              {...register("searchFromDate")}
              className="p-2 bg-transparent border-2 outline-none border-lime-600"
            />
            <input
              type="datetime-local"
              {...register("searchToDate")}
              className="p-2 bg-transparent border-2 outline-none border-lime-600"
            />
            <button
              type="submit"
              className="p-2 font-extrabold text-white bg-green-600 border-2 border-green-600"
            >
              QIDIRISH
            </button>
            <button
              className="p-2 font-extrabold text-white bg-red-600 border-2 border-red-600"
              onClick={() => {
                reset((register) => ({
                  ...register,
                }));
                criminalSearch.current.value = null;
              }}
            >
              TOZALASH
            </button>
          </div>
        </form>
      </div>
      <div className="container mx-auto">
        {data?.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.map((item) => (
              <SearchCriminalCard key={item.id} data={item} />
            ))}
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
