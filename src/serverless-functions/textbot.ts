import { EfnycConversationHandlers } from "../textbot/efnyc/conversation-handlers";
import { createServerlessHandlerForTextbot } from "../textbot/run-as-serverless-function";
import { serverlessRollbarHandler } from "../utils/serverless-util";

export const handler = serverlessRollbarHandler(
  createServerlessHandlerForTextbot(
    (options) => new EfnycConversationHandlers(options)
  )
);
