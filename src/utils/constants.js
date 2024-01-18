export const BASE_URL = "http://0.0.0.0";
export const EXIST_SOCKET_URL = "ws://0.0.0.0:5000/";
export const DETECT_SOCKET_URL = "ws://0.0.0.0:11223/";
export const DETECT_TIMEOUT = 600000;
export const MAP_CONFIG = {
  center: [41.00064, 71.67327],
  zoom: 15,
  maxZoom: 18,
  minZoom: 12,
  zoomCustom: 11,
  zoomControl: true,
  scrollWheelZoom: true,
  tileLayer: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.milliygvardiya.uz/">Milliy Gvardiya</a>',
  },
  maxBounds: [
    [40.90064, 71.57327],
    [41.10064, 71.77327],
  ],
};
export const INPUT_PATTERN_CHECK = {
  data: {
    pattern: /^[A-Za-z_ '"`]+$/,
    message: "Belgi ishlatish mumkin emas!",
  },
};

