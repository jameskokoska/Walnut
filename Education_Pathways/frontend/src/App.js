import React from "react";
import TransitionRoutes from "./struct/TransitionRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <TransitionRoutes />
    </BrowserRouter>
  );
}
