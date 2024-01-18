const mapLayers = [
  {
    label: "OpenStreetMap",
    value: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  {
    label: "Google Maps Satellite",
    value: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  },
  {
    label: "Google Maps Terrain",
    value: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
  },
  {
    label: "Google Maps Roads",
    value: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
  },
  {
    label: "Google Maps Hybrid",
    value: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
  },
];

export default mapLayers;
