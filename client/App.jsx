import React from "react";
import { useEffect, useState } from "react";
import CreatePage from "./components/CreatePage.jsx";
import { Route, Routes } from "react-router-dom";
import PetPage from "./components/PetPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import HomePage from "./components/HomePage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
