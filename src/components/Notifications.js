import { toast } from "react-toastify";
export const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// ADD SUCCESS NOTIFICATION
export const handleSuccess = (msg) => {
  toast.success(msg, toastOptions);
};

// ADD ERROR NOTIFICATION
export const handleError = (msg) => {
  toast.error(msg, toastOptions);
};
