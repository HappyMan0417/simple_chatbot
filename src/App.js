import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import Header from "./layouts/header";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <div className="app h-screen flex flex-col">
        {/* <Header /> */}
        <div className="flex-grow">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
