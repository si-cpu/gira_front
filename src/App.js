import "./App.css";
import React from "react";
import Mainpage from "./components/Mainpage";
import { Routes, Route } from "react-router-dom";
import Loginpage from "./components/Userinfo/Loginpage";
import Registerpage from "./components/Userinfo/Registerpage";
import Mypage from "./components/Userinfo/Mypage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </>
  );
}

export default App;
