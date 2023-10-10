import { RecoilRoot } from "recoil";
import AdminMain from "./pages/AdminMain";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <RecoilRoot>
      <div style={{ minHeight: "85vh" }} className="px-3">
        <AdminMain />
      </div>
      <ToastContainer />
    </RecoilRoot>
  );
}
