import "source-map-support/register";

import { upperCase } from "lodash";
import { serverlessRollbarHandler } from "../utils/serverless-util";

async function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

export const handler = serverlessRollbarHandler(async (event) => {
  const kaboom =
    event.queryStringParameters && event.queryStringParameters.kaboom;

  await wait(1);

  if (kaboom) {
    throw new Error("Kaboom!");
  }

  return {
    statusCode: 200,
    body: upperCase("umm hi again yup"),
  };
});
