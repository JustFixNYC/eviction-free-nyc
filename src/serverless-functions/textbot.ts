import { EfnycConversationHandlers } from "../textbot/efnyc-conversation-handlers";
import { serverlessRollbarHandler } from "../utils/serverless-util";

export const handler = serverlessRollbarHandler(async (event) => {
  const query = event.queryStringParameters;
  const input = query ? query.input : undefined;
  const state = query ? query.state : undefined;
  const handlers = new EfnycConversationHandlers({ state, input });
  return {
    statusCode: 200,
    body: JSON.stringify(await handlers.handle()),
  };
});
