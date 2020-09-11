import { callServerlessHandler } from "../utils/serverless-testing-util";
import { handler } from "./hello-world";

describe("hello-world", () => {
  it("works with no querystring args", async () => {
    const result = await callServerlessHandler(handler);
    expect(result).toEqual({
      body: "HELLO WORLD",
      statusCode: 200,
    });
  });

  it("throws error with kaboom=on", async () => {
    const result = callServerlessHandler(handler, {
      queryStringParameters: { kaboom: "on" },
    });
    await expect(result).rejects.toThrow("Kaboom!");
  });
});
