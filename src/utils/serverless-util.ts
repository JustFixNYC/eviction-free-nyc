import { APIGatewayProxyHandler } from "aws-lambda";
import Rollbar from "rollbar";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.development`,
});

export const serverlessRollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_POST_SERVER_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

/**
 * Wraps an AWS Lambda handler such that any exceptions raised
 * by it will be reported to Rollbar.
 */
export function serverlessRollbarHandler(
  handler: APIGatewayProxyHandler
): APIGatewayProxyHandler {
  // Note that Rollbar and AWS Lambda's types have slightly different
  // typings for lambda handlers; the latter is more detailed/accurate
  // so we'll typecast.
  return serverlessRollbar.lambdaHandler(handler as Rollbar.LambdaHandler);
}
