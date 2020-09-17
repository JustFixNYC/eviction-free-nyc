import { EfnycConversationHandlers } from "../textbot/efnyc-conversation-handlers";
import { createServerlessHandlerForConversation } from "../textbot/run-as-serverless-function";
import { serverlessRollbarHandler } from "../utils/serverless-util";

export const handler = serverlessRollbarHandler(
  createServerlessHandlerForConversation(
    (options) => new EfnycConversationHandlers(options)
  )
);
