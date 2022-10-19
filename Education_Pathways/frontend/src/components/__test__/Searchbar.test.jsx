import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Searchbar from "../Searchbar/Searchbar";

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
    render(<Searchbar />, container);
  });

  const searchbar = container.firstChild;
  expect(searchbar).toBeInTheDocument();

  const input = searchbar.querySelector("input");
  expect(input.classList).toContain("text-input-search");
});
