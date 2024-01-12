import axios from "axios";
// 192.168.254.150
export const api = axios.create({
  baseURL: "http://192.168.254.150:8000",
  headers: {
    common: {
      Authorization: `Token ${localStorage.getItem("token")}`,
        // "Content-Type": "application/x-www-form-urlencoded",
    },
  }
});
