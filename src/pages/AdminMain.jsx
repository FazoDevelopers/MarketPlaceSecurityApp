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
        <Route
          path="/"
          element={
            <MainMap
              data={{
                first_name: "Javohirbek",
                last_name: "Javohirbek",
                age: "fsdajkaskjasdf",
                description: "yesterday",
                image: "http://192.168.1.122:5000/media/Javohirbek",
                camera: {
                  name: "Camera01",
                  url: "http://192.168.1.142:5000/video",
                  longitude: 41.02354212,
                  latitude: 71.015645324,
                },
              }}
            />
          }
        />
        <Route path="/camera" element={<MainCamera />} />
        <Route path="/criminal" element={<MainCriminal />} />
        <Route path="/search" element={<MainSearch />} />
      </Routes>
    </>
  );
}
