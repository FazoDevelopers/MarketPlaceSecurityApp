import { Route, Routes } from "react-router-dom";
import MainCamera from "../components/MainPages/MainCamera";
import MainCriminal from "../components/MainPages/MainCriminal";
import MainMap from "../components/MainPages/MainMap";
import MainSearch from "../components/MainPages/MainSearch";
import Navbar from "../components/Navbar";

export default function AdminMain() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainMap />} />
        <Route path="/camera" element={<MainCamera />} />
        <Route path="/criminal" element={<MainCriminal />} />
        <Route path="/search" element={<MainSearch />} />
      </Routes>
    </>
  );
}
