import { useState } from "react";
import PropTypes from "prop-types";

export default function PinnedCards({ data }) {
  const [isPinned, setIsPinned] = useState(false);

  const pinDelete = () => {
    setIsPinned(!isPinned);

    console.log(isPinned);
  };

  return (
    <div
      onClick={() => pinDelete()}
      className={`group relative border-lime-500 border-1 bg-lime-600 w-[100px] flex flex-col p-2 ${
        isPinned ? "hidden" : ""
      }`}
    >
      <img
        src={data.image}
        className="w-full object-cover aspect-square"
        alt=""
      />
      <div className="flex flex-col w-[300px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 p-2">
        <span className="text-sm p-2">Ism: {data.first_name}</span>
        <span className="text-sm p-2">Familiya: {data.last_name}</span>
        <span className="text-sm p-2">Otasi: {data.dad_name}</span>
        <span className="text-sm p-2">Yoshi: {data.age}</span>
        <span className="text-sm p-2">Sharh: {data.description}</span>
      </div>
    </div>
  );
}

PinnedCards.propTypes = {
  data: PropTypes.object.isRequired,
};
