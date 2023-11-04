import { useState } from "react";
import "../MainStyle.css";
import PropTypes from "prop-types";

export default function CriminalCard({ data }) {
  console.log(data.first_name);
  const [isPinned, setIsPinned] = useState(false);

  const pinCriminal = () => {
    setIsPinned(!isPinned);
    console.log(isPinned);
  };
  return (
    <div
      className="criminal_card_wrapper absolute p-2 overflow-hidden cursor-pointer hover:z-20 w-full"
      style={{
        marginTop: isPinned ? 0 : `${Number(data.key) * 100}px`,
        zIndex: isPinned ? 99 : "unset",
        // transform: "perspective(600px) rotateX(-45deg)",
      }}
    >
      <div className="border-lime-500 border-8 py-2 px-3 bg-lime-600 text-white font-extrabold">
        <div className="flex justify-between align-middle">
          <span className="font-bebas text-base">{data.first_name}</span>
          <i
            className="fa-solid fa-thumbtack"
            style={isPinned ? { transform: "rotate(35deg)" } : null}
            onClick={pinCriminal}
            onKeyPress={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                pinCriminal();
              }
            }}
            tabIndex={0} // Add a tabindex to make it focusable
          ></i>
        </div>
        <p className="text-sm text-end font-orbitron">{data.first_name}</p>
      </div>
      <img src={data.image} className="object-cover" alt="" />
      <div className="w-full border-gray-400 border-2 text-gray-400 bg-black p-2">
        <p>Ism: {data.first_name}</p>
        <p>Familiya: {data.last_name}</p>
        <p>Otasi: {data.dad_name}</p>
        <p className="text-sm">Sharh: {data.description}</p>
      </div>
    </div>
  );
}

CriminalCard.propTypes = {
  data: PropTypes.object.isRequired,
};
