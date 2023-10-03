import { atom } from "recoil";

export const latState = atom({
  key: "lat",
  default: 52.22977,
});

export const lngState = atom({
  key: "lng",
  default: 21.01178,
});