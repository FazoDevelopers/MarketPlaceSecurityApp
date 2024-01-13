import PropTypes from "prop-types";
export default function SearchCriminalCard(props) {
  function formatDateString(isoString) {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <>
      <div className="px-3 py-2 font-extrabold text-white border-4 border-lime-600 bg-opacity-20 bg-lime-600">
        <div className="relative">
          <img
            className="object-cover w-full aspect-square"
            src={props.data.image_path}
            alt=""
          />
          <span>KAMERA: {props.data.camera.name}</span> <br />
          <span>Aniqlandi: {formatDateString(props.data.date_recorded)}</span>
        </div>
      </div>
    </>
  );
}

SearchCriminalCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_path: PropTypes.string.isRequired,
    camera: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    date_recorded: PropTypes.string.isRequired,
  }),
};
