import { useState } from "react";
import "../MainStyle.css";
import PropTypes from "prop-types";

export default function CriminalCard({
  data,
  setPinnedCriminals,
  pinnedCriminals,
}) {
  console.log(data.first_name);
  const [isPinned, setIsPinned] = useState(false);

  if (isPinned) {
    // Check if the data already exists in pinnedCriminals
    const isDataExists = pinnedCriminals.some(
      (criminal) => criminal.id === data.id
    );

    // If the data doesn't exist, add it to pinnedCriminals
    if (!isDataExists) {
      setPinnedCriminals((prev) => [data, ...prev]);
      console.log("true");
    }
  }

  const pinCriminal = () => {
    setIsPinned(!isPinned);
  };
  return (
    <div className="criminal_card_wrapper p-2 overflow-hidden cursor-pointer hover:z-20 w-full">
      <div className="flex flex-row gap-5 border-lime-500 border-1 bg-lime-600 text-white font-extrabold">
        <img src={data.image} className="object-cover w-[8rem]" />
        <div className="flex flex-col p-2">
          {!isPinned && (
            <div className="text-end">
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
          )}
          <span className="text-sm">{data.first_name}</span>
          <span className="text-sm">{data.last_name}</span>
          <span className="text-sm">{data.dad_name}</span>
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
  setPinnedCriminals: PropTypes.array.isRequired,
  pinnedCriminals: PropTypes.array.isRequired,
};
