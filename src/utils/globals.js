import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { latState, lngState } from "../recoil/atoms";

export const TOAST_OPTIONS = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const handleSuccess = (msg = "Success") => {
  toast.success(msg, TOAST_OPTIONS);
};

export const handleError = (msg = "Error") => {
  toast.error(msg, TOAST_OPTIONS);
};

export const decreasePageIndex = (indexPage, prevPage) => {
  if (prevPage) {
    indexPage((prev) => prev - 1);
  }
};

export const increasePageIndex = (indexPage, nextPage) => {
  if (nextPage) {
    indexPage((prev) => prev + 1);
  }
};

export const GetCoordinates = () => {
  const map = useMap();
  const [, setLat] = useRecoilState(latState);
  const [, setLng] = useRecoilState(lngState);

  useEffect(() => {
    if (!map) return;
    map.on("moveend", () => {
      const { lat, lng } = map.getCenter();
      setLat(lat);
      setLng(lng);
    });
  }, [map, setLat, setLng]);

  return null;
};
