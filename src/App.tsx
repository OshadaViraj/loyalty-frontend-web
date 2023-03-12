import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/Home";
import ResponsiveAppBar from "./components/common/AppBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <>
    <ResponsiveAppBar />
    <main style={{ height: "calc(100vh - 68.5px)", overflow: "auto" }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop={false}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        theme="colored"
        limit={1}
        pauseOnHover
      />
    </main>
  </>
);

export default App;
