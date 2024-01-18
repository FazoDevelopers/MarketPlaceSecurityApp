import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import {
  isDelCriminalModalState,
  isUpCriminalModalState,
} from "../../recoil/atoms";

export default function ViewCriminalCard(props) {
  const [, setIsUpCriminalModal] = useRecoilState(isUpCriminalModalState);
  const [, setIsDelCriminalModal] = useRecoilState(isDelCriminalModalState);

  return (
    <>
      <div className="px-3 py-2 font-extrabold text-white border-4 border-lime-600 bg-opacity-20 bg-lime-600">
        <div className="relative">
          <img
            className="object-cover w-full aspect-square"
            src={props.data.image_url}
            alt={props.data.image_url}
          />
        </div>
        <h1 className="mt-1 text-2xl">Ism: {props.data.first_name}</h1>
        <h1 className="mt-1 text-2xl">Familiya: {props.data.last_name}</h1>
        <h1 className="mt-1 text-2xl">Otasi: {props.data.middle_name}</h1>
        <p className="font-thin">Sharh: {props.data.description}</p>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-5 py-2 bg-red-800"
            onClick={() => {
              setIsDelCriminalModal(true);
              props.deleteData(props.data);
            }}
          >
            <i className="fa-solid fa-trash"></i> O`CHIRISH
          </button>
          <button
            type="button"
            className="px-5 py-2 bg-green-800"
            onClick={() => {
              setIsUpCriminalModal(true);
              props.updateData(props.data);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i> TAHRIRLASH
          </button>
        </div>
      </div>
    </>
  );
}

ViewCriminalCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    middle_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  deleteData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
};
