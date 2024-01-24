import PropTypes from "prop-types";
import "../MainStyle.css";
import { useState } from "react";

export default function DetectHumanCard({ data }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <div className="w-[1000px] absolute z-40 -right-[1000px] top-0">
        <img
          src={data?.image}
          alt="Image for detect human"
          className={`w-full ${isHovered ? "block" : "hidden"}`}
        />
      </div>
      <div
        className="w-full p-2 overflow-hidden cursor-pointer criminal_card_wrapper opacity-95 hover:bg-red-500"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <div className="font-extrabold text-white bg-gray-600 border-2 border-gray-500">
          <div className="grid grid-cols-2">
            <img
              src={data?.image}
              className="object-cover"
              alt=""
            />
            <div className="flex flex-col justify-between p-2 align-middle">
              <span className="text-base font-bebas">{data?.camera?.name}</span>
              <span className="text-sm font-bebas">Lat: {data?.camera?.latitude}</span>
              <span className="text-sm font-bebas">Long: {data?.camera?.longitude}</span>
            </div>
          </div>
          <p className="p-2 text-sm text-center tracking-wider bg-red-500">
            {data?.image?.split("/criminals/")[1].split(".jpg")[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

DetectHumanCard.propTypes = {
  data: PropTypes.object.isRequired,
};
