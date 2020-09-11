import { ConsoleIO } from "./console-io";
import { handleConversation } from "./conversation-handlers";
import { ConversationResponse, ConversationStatus } from "./conversation";

export async function runChatbotInConsole() {
  const io = new ConsoleIO();
  let state = '';
  let input = '';
  let ended = false;

  while (!ended) {
    const response: ConversationResponse = await handleConversation(input, state);
    state = response.state;
    io.writeLine(response.text);
    if (response.conversationStatus === ConversationStatus.End) {
      ended = true;
    } else if (response.conversationStatus === ConversationStatus.Loop) {
      // Do nothing, just loop.
    } else if (response.conversationStatus === ConversationStatus.Ask) {
      input = await io.question('> ');
    }
  }

  io.close();
}
