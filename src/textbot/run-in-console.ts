import { ConsoleIO } from "./console-io";
import { EfnycConversationHandlers } from "./conversation-handlers";
import { ConversationResponse, ConversationStatus } from "./conversation";

export async function runChatbotInConsole() {
  const io = new ConsoleIO();
  let state = "";
  let input = "";
  let ended = false;

  while (!ended) {
    const handlers = new EfnycConversationHandlers(state, input);
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
