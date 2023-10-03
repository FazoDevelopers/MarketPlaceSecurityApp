import React from "react";
import Navbar from "../components/Navbar";
import CameraMain from "../components/MainPages/MainMap";
import { Route, Router, Routes } from "react-router-dom";

export default function AdminMain() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CameraMain />} />
        <Route path="/camera" element={<CameraMain />} />
        <Route path="/criminal" element={<CameraMain />} />
        <Route path="/search" element={<CameraMain />} />
      </Routes>
    </>
  );
}
