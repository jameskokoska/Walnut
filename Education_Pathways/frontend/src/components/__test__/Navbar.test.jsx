import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { BrowserRouter } from "react-router-dom";

import Navbar from "../Navbar/Navbar";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Renders the Navbar component", () => {
  act(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
      container
    );
  });

  const navbar = container.firstChild;
  expect(navbar).toBeInTheDocument();

  const title = navbar.querySelector(".navbar-left-container");
  expect(title.textContent).toBe("Walnut");
});
