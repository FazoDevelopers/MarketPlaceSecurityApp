import PropTypes from "prop-types";
import "../MainStyle.css";
export default function DetectHumanCard({ data }) {
  console.log(data);
  return (
    <div className="w-full p-2 overflow-hidden cursor-pointer criminal_card_wrapper hover:z-20 opacity-95">
      <div className="font-extrabold text-white bg-gray-600 border-2 border-gray-500">
        <div className="grid grid-cols-2">
          <img src={data.image_path} className="object-cover" alt="" />
          <div className="flex flex-col justify-between p-2 align-middle">
            <span className="text-base font-bebas">
              {data.camera_object.name}
            </span>
            <span className="text-sm font-bebas">
              Lat: {data.camera_object.latitude}
            </span>
            <span className="text-sm font-bebas">
              Long: {data.camera_object.longitude}
            </span>
            {/* <i
                className="fa-solid fa-thumbtack"
                style={isPinned ? { transform: "rotate(35deg)" } : null}
                onClick={pinCriminal}
              ></i> */}
          </div>
        </div>
        <p className="p-2 text-base text-center bg-red-500 font-orbitron">
          {data.image_path.split("/suspends/")[1].split(".jpg")[0]}
        </p>
      </div>
    </div>
  );
}

DetectHumanCard.propTypes = {
  data: PropTypes.object.isRequired,
};
