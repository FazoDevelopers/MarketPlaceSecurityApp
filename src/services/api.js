import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.150:8000",
  headers: {
    common: {
      Authorization: `Token ${sessionStorage.getItem("token")}`,
      //   "Content-Type": "application/x-www-form-urlencoded",
    },
  },
});
