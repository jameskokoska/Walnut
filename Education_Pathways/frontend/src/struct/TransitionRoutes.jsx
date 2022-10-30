import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../App.css";
import Navbar from "../components/Navbar/Navbar";
import { pages } from "../util/pages";
import ScrollToTop from "./ScrollToTop";

export default function TransitionRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <div style={{ textAlign: "center" }}>
        <Navbar />
      </div>

      <ScrollToTop />
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Routes location={location}>
          {[...pages["main"]].map((page) => {
            return (
              <Route
                path={page.path}
                key={page.path}
                element={
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      left: 0,
                      bottom: 0,
                      inset: "80px",
                    }}
                  >
                    <div style={{ minHeight: "100vh" }}>{page.component}</div>
                  </div>
                }
              />
            );
          })}
          <Route path="*" element={pages["404"].component} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
