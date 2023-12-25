import React from "react";
import { Routes, Route } from "react-router-dom";
import Chatbot from "../pages/chatbot";
import Home from "../pages/home";

import NotFound from "../pages/notfound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
