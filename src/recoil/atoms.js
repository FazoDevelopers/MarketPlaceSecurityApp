import { atom } from "recoil";

export const latState = atom({
  key: "lat",
  default: 52.22977,
});

export const lngState = atom({
  key: "lng",
  default: 21.01178,
});

export const isAddCameraModalState = atom({
  key: "isAddCameraModal",
  default: false,
});

export const isUpCameraModalState = atom({
  key: "isUpCameraModal",
  default: false,
});

export const isDelCameraModalState = atom({
  key: "isDelCameraModal",
  default: false,
});


export const isAddCriminalModalState = atom({
  key: "isAddCriminalModal",
  default: false,
});

export const isUpCriminalModalState = atom({
  key: "isUpCriminalModal",
  default: false,
});

export const isDelCriminalModalState = atom({
  key: "isDelCriminalModal",
  default: false,
});