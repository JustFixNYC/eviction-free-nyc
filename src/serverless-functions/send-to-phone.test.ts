import { validatePath, validatePhoneNumber } from "./send-to-phone";

describe("validatePhoneNumber", () => {
  it("works with valid phone numbers", async () => {
    expect(validatePhoneNumber("1 (646) 622-1345")).toEqual("+16466221345");
  });
  it("works for invalid phone numbers", async () => {
    expect(validatePhoneNumber("(646) 622-1345")).toEqual(false);
  });
});

describe("validatePath", () => {
  it("works with valid paths", async () => {
    expect(validatePath("/blah")).toEqual("/blah");
  });
  it("works for invalid paths", async () => {
    expect(validatePath("blah")).toEqual(null);
  });
  it("works for empty paths", async () => {
    expect(validatePath("")).toEqual(null);
  });
});
