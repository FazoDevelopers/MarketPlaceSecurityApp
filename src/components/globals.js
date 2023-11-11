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

// Previous page index for pagination
export const decreasePageIndex = (indexPage, prevPage) => {
  if (prevPage) {
    indexPage((prev) => prev - 1);
  }
};

// Next page index for pagination
export const increasePageIndex = (indexPage, nextPage) => {
  if (nextPage) {
    indexPage((prev) => prev + 1);
  }
};
