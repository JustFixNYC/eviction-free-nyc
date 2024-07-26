import React from "react";
import { render } from "@testing-library/react";
import ButtonStep from "./components/ButtonStep";

describe("Test suite", () => {
  it("should run properly", () => {
    expect("Boop").toBe("Boop");
  });
  it("works with tsx components too", () => {
    const { container } = render(
      <ButtonStep stepFn={() => {}} isDisabled={false}>
        Boop
      </ButtonStep>
    );
    const span = container.querySelector("button");
    expect(span?.textContent).toBe("Boop");
  });
});
