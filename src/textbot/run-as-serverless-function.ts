import { APIGatewayProxyHandler } from "aws-lambda";
import { ConversationFactory } from "./base-conversation-handlers";

export function createServerlessHandlerForConversation(
  factory: ConversationFactory<any>
): APIGatewayProxyHandler {
  const handler: APIGatewayProxyHandler = async (event) => {
    const query = event.queryStringParameters;
    const input = query ? query.input : undefined;
    const state = query ? query.state : undefined;
    const handlers = factory({ state, input });
    return {
      statusCode: 200,
      body: JSON.stringify(await handlers.handle()),
    };
  };

  return handler;
}
