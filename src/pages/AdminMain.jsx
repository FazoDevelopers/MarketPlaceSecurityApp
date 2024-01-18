import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../components/MainPages/LoginPage";
import MainCamera from "../components/MainPages/MainCamera";
import MainCriminal from "../components/MainPages/MainCriminal";
import MainMap from "../components/MainPages/MainMap";
import MainSearch from "../components/MainPages/MainSearch";
import Navbar from "../components/Navbar";

export default function AdminMain() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && !isLoginPage) {
      navigate("/");
    }
  }, [navigate, token, isLoginPage]);

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<MainMap />} />
        <Route path="/camera" element={<MainCamera />} />
        <Route path="/criminal" element={<MainCriminal />} />
        <Route path="/search" element={<MainSearch />} />
      </Routes>
    </>
  );
}