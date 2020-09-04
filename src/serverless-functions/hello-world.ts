import "source-map-support/register";

import { upperCase } from "lodash";
import { APIGatewayProxyHandler } from "aws-lambda";

async function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const kaboom =
    event.queryStringParameters && event.queryStringParameters.kaboom;

  if (kaboom) {
    throw new Error("Kaboom!");
  }

  await wait(3);

  return {
    statusCode: 200,
    body: upperCase("umm hi again yup"),
  };
};
