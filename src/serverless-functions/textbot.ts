import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { handleConversation } from "../textbot/conversation-handlers";

export const handler: APIGatewayProxyHandler = async (event) => {
  const query = event.queryStringParameters;
  const input = query ? query.input : undefined;
  const state = query ? query.state : undefined;
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(await handleConversation(input || "", state)),
  };

  return response;
};
