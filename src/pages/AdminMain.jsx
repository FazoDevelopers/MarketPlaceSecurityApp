import React from "react";
import Navbar from "../components/Navbar";
import MainMap from "../components/MainPages/MainMap";
import { Route, Router, Routes } from "react-router-dom";
import MainCamera from "../components/MainPages/MainCamera";
import MainCriminal from "../components/MainPages/MainCriminal";
import MainSearch from "../components/MainPages/MainSearch";

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
