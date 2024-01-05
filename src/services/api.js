import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.150:8000",
  headers: {
    common: {
      Authorization: "Token 459ede94edbd1c8a1fc1a47194bebaf79523853e",
      //   "Content-Type": "application/x-www-form-urlencoded",
    },
  },
});
