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
      className="criminal_card_wrapper p-2 overflow-hidden cursor-pointer hover:z-20 w-full"
      style={{
        marginTop: isPinned ? 0 : `${Number(data.key) * 100}px`,
        zIndex: isPinned ? 99 : "unset",
        // transform: "perspective(600px) rotateX(-45deg)",
      }}
    >
      <div className="flex flex-row border-lime-500 border-1 bg-lime-600 text-white font-extrabold">
        <img src={data.image} className="object-cover w-[8rem]" />
        <div className="flex flex-col p-2">
          <span className="text-sm">{data.first_name}</span>
          <span className="text-sm">{data.last_name}</span>
          <span className="text-sm">{data.dad_name}</span>
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
      </div>

      <div className="w-full border-gray-400 border-2 text-gray-400 bg-black p-2">
        <p className="text-sm">Sharh: {data.description}</p>
      </div>
    </div>
  );
}

CriminalCard.propTypes = {
  data: PropTypes.object.isRequired,
};
