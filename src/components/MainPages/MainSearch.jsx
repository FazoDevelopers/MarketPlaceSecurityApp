import React from "react";
import { useForm } from "react-hook-form";

export default function MainSearch() {
  // make useForm for react form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="container mx-auto text-white flex justify-between">
        <h1 className="font-bebas text-4xl md:text-6xl mb-4 md:mb-0">
          KAMERALAR
        </h1>
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
            <i className="fas fa-search"></i>
            QIDIRISH
          </button>
        </div>
      </div>
    </>
  );
}
