import PropTypes from "prop-types";
import { useState } from "react";
import "../MainStyle.css";

export default function CriminalCard({
  data,
  setPinnedCriminals,
  pinnedCriminals,
}) {
  console.log(data);
  const [isPinned, setIsPinned] = useState(false);

  if (isPinned) {
    // Check if the data already exists in pinnedCriminals
    const isDataExists = pinnedCriminals.some(
      (criminal) => criminal.id === data.identity.id
    );

    // If the data doesn't exist, add it to pinnedCriminals
    if (!isDataExists) {
      setPinnedCriminals((prev) => [data, ...prev]);
    }
  }

  const pinCriminal = () => {
    setIsPinned(!isPinned);
  };
  return (
    <div className="w-full p-2 overflow-hidden cursor-pointer criminal_card_wrapper hover:z-20">
      <div className="flex flex-row gap-5 font-extrabold text-white border-lime-500 border-1 bg-lime-600">
        <img src={data.identity.image_url} className="object-cover w-[8rem]" />
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
                tabIndex={0}
              ></i>
            </div>
          )}
          <span className="text-sm">{data.identity.first_name}</span>
          <span className="text-sm">{data.identity.last_name}</span>
          <span className="text-sm">{data.identity.dad_name}</span>
        </div>
      </div>

      <div className="w-full p-2 text-gray-400 bg-black border-2 border-gray-400">
        <p className="text-sm">Sharh: {data?.identity?.description}</p>
      </div>
    </div>
  );
}

CriminalCard.propTypes = {
  data: PropTypes.object.isRequired,
  setPinnedCriminals: PropTypes.array.isRequired,
  pinnedCriminals: PropTypes.array.isRequired,
};
