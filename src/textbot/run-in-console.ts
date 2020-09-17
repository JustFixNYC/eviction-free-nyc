import { ConsoleIO } from "./console-io";
import { ConversationResponse, ConversationStatus } from "./conversation";
import {
  BaseConversationHandlers,
  BaseConversationOptions,
} from "./base-conversation-handlers";

export async function runChatbotInConsole(
  factory: (
    options: BaseConversationOptions<any>
  ) => BaseConversationHandlers<any>
) {
  const io = new ConsoleIO();
  let state = "";
  let input = "";
  let ended = false;

  while (!ended) {
    const handlers = factory({ state, input });
    const response: ConversationResponse = await handlers.handle();
    state = response.state;
    io.writeLine(response.text);
    if (response.conversationStatus === ConversationStatus.End) {
      ended = true;
    } else if (response.conversationStatus === ConversationStatus.Loop) {
      // Do nothing, just loop.
    } else if (response.conversationStatus === ConversationStatus.Ask) {
      input = await io.question("> ");
    }
  }

  io.close();
}
