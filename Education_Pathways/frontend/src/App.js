import React from 'react'
import NavbarComp from "./components/Navbar.js";
import ReactComp from "./components/Footer.js";
import './App.css';
import TransitionRoutes from './struct/TransitionRoutes.jsx';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <TransitionRoutes />
    </BrowserRouter>
  );
}