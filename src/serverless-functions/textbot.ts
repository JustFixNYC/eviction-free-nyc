import { APIGatewayProxyResult } from "aws-lambda";
import { handleConversation } from "../textbot/conversation-handlers";
import { serverlessRollbarHandler } from "../utils/serverless-util";

export const handler = serverlessRollbarHandler(async (event) => {
  const query = event.queryStringParameters;
  const input = query ? query.input : undefined;
  const state = query ? query.state : undefined;
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(await handleConversation(input || "", state)),
  };

  return response;
});
