import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import AdminMain from "./pages/AdminMain";

export default function App() {
  return (
    <RecoilRoot>
      <div style={{ minHeight: "85vh" }} className="px-3">
        <AdminMain />
      </div>
      <ToastContainer theme="light" />
    </RecoilRoot>
  );
}
