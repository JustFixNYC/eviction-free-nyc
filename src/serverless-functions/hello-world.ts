import "source-map-support/register";

import { upperCase } from "lodash";
import { serverlessRollbarHandler } from "../utils/serverless-util";

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const handler = serverlessRollbarHandler(async (event) => {
  const kaboom =
    event.queryStringParameters && event.queryStringParameters.kaboom;

  await wait(10);

  if (kaboom) {
    throw new Error("Kaboom!");
  }

  return {
    statusCode: 200,
    body: upperCase("hello world"),
  };
});
