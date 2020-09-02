import React from "react";
import { DummyComponent } from "./dummy-component";
import { render } from "@testing-library/react";

describe("Test suite", () => {
  it("should run properly", () => {
    expect("Boop").toBe("Boop");
  });
  it("works with tsx components too", () => {
    const { container } = render(<DummyComponent sampleProp />);
    const span = container.querySelector("span");
    expect(span?.textContent).toBe("It works!");
  });
});
