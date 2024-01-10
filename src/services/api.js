import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.119.6.226:8000",
  headers: {
    common: {
      Authorization: `Token ${sessionStorage.getItem("token")}`,
      //   "Content-Type": "application/x-www-form-urlencoded",
    },
  },
});
