import "source-map-support/register";

import { upperCase } from "lodash";
import { serverlessRollbarHandler } from "../utils/serverless-util";

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * This is a sample function that returns the text "HELLO WORLD".
 *
 * If "kaboom=on" is passed as a querystring argument, an exception will
 * be thrown (and logged to Rollbar if it's configured).
 */
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
