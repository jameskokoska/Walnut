import React from "react";
import "./App.css";
import TransitionRoutes from "./struct/TransitionRoutes.jsx";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <TransitionRoutes />
    </BrowserRouter>
  );
}
