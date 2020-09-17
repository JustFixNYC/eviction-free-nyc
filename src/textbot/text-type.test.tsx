import React from "react";
import { convertToText } from "./text-type";

describe("convertToText()", () => {
  it("passes back strings", () => {
    expect(convertToText("blah")).toBe("blah");
  });

  it("joins lists of strings with newlines", () => {
    expect(convertToText(["foo", "bar"])).toBe("foo\nbar");
  });

  it("stringifies React elements", () => {
    expect(
      convertToText(
        <>
          Hello
          <br />
          there
        </>
      )
    ).toBe("Hello\nthere");
  });
});
