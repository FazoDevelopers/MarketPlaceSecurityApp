import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import SearchCriminalCard from "../MainCards/SearchCriminalCard";

export default function MainSearch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [indexPage, setIndexPage] = useState(1);
  const [nextPageStatus, setNextPageStatus] = useState(null);
  const [prevPageStatus, setPrevPageStatus] = useState(null);

  const { register, handleSubmit, getValues } = useForm();

  // Fetch records based on the form data and page index
  const fetchRecords = async () => {
    const formData = getValues(); // Get current form data
    const params = new URLSearchParams({
      date_recorded__gte: formData.searchFromDate,
      date_recorded__lte: formData.searchToDate,
      page: indexPage,
    }).toString();

    try {
      const response = await axios.get(`/api/records/?${params}`);
      console.log(response);
      if (Array.isArray(response.data.results)) {
        const reversedResponse = [...response.data.results].reverse();
        setData(reversedResponse);
      } else {
        setData([]);
      }
      setNextPageStatus(response.data.next);
      setPrevPageStatus(response.data.previous);
    } catch (error) {
      setError(error);
    }
  };

  // Effect to fetch records when the indexPage changes
  useEffect(() => {
    fetchRecords();
  }, [indexPage]); // Only re-run the effect if indexPage changes

  // Previous page index for pagination
  const decreasePageIndex = () => {
    if (prevPageStatus) {
      setIndexPage((prev) => prev - 1);
    }
  };

  // Next page index for pagination
  const increasePageIndex = () => {
    if (nextPageStatus) {
      setIndexPage((prev) => prev + 1);
    }
  };

  // Function to handle form submission
  const onSubmit = (data) => {
    fetchRecords();
  };

  return (
    <>
      <div className="container mx-auto text-white flex justify-between">
        <h1 className="font-bebas text-4xl md:text-6xl mb-4 md:mb-0">
          QIDIRUV
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
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
              QIDIRISH
            </button>
          </div>
        </form>
      </div>
      <div className="container mx-auto">
        {error && (
          <p className="text-red-500">An error occurred: {error.message}</p>
        )}

        {data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {data.map((item) => (
              <SearchCriminalCard key={item.id} data={item} />
            ))}
          </div>
        ) : (
          <div className="text-center p-64 text-gray-600 uppercase font-bold">
            <h1 className="text-8xl">Bo`sh</h1>
            <h1 className="text-3xl font-bold">Jinoyatchi mavjud emas</h1>
          </div>
        )}

        <div className="flex justify-center my-5 text-white">
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
