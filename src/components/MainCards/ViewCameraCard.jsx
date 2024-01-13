import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { isUpCameraModalState } from "../../recoil/atoms";
export default function ViewCameraCard(props) {
  const [, setIsUpCameraModal] = useRecoilState(isUpCameraModalState);
  return (
    <div className="px-3 py-2 font-extrabold text-white border-4 border-lime-600 bg-opacity-20 bg-lime-600">
      <div className="relative">
        <img
          src={props.data.image}
          alt={props.data.image}
          className="object-cover w-full h-auto aspect-square"
        />
        <div className="absolute inset-0 p-3 text-3xl bg-gradient-to-b from-black via-transparent to-transparent font-bebas">
          #{props.data.name}
        </div>
      </div>

      <h1 className="mt-3 text-2xl font-bebas">{props.data.name}</h1>
      <p>
        ID: {props.data.id} <br />
        Latitude: <b>{props.data.latitude}</b> <br />
        Longitude: <b>{props.data.longitude}</b>
      </p>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="px-5 py-2 bg-red-800"
          onClick={() => {
            props.deleteCamera(props.data);
          }}
        >
          <i className="fa-solid fa-trash"></i> O`CHIRISH
        </button>
        <button
          type="button"
          className="px-5 py-2 bg-green-800"
          onClick={() => {
            setIsUpCameraModal(true);
            props.upCameraDatas(props.data);
          }}
        >
          <i className="fa-solid fa-pen-to-square"></i> TAHRIRLASH
        </button>
      </div>
    </div>
  );
}

ViewCameraCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
  deleteCamera: PropTypes.func.isRequired,
  upCameraDatas: PropTypes.func.isRequired,
};