import { upperCase } from "lodash";
import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  const kaboom =
    event.queryStringParameters && event.queryStringParameters.kaboom;

  if (kaboom) {
    throw new Error("Kaboom!");
  }

  return {
    statusCode: 200,
    body: upperCase("umm hi again"),
  };
};
