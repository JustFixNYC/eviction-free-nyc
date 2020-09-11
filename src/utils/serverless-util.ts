import { APIGatewayProxyHandler } from "aws-lambda";
import Rollbar from "rollbar";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
  dotenv.config({
    path: `.env.development`,
  });
}

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
  if (process.env.NODE_ENV === "test") {
    // If we're running tests, just return the handler as-is.
    return handler;
  } else {
    return serverlessRollbar.lambdaHandler(handler as Rollbar.LambdaHandler);
  }
}
