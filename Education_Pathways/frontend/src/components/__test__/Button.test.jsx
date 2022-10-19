import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Button from "../Button/Button";

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

it("Renders the Button component", () => {
  act(() => {
    render(<Button label={"About"} isSecondary={true} />, container);
  });

  const button = container.firstChild;
  expect(button).toBeInTheDocument();
  expect(button.textContent).toBe("About");
  expect(button.classList).toContain("button");
  expect(button.classList).toContain("secondary-button");
});
