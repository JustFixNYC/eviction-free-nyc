import { ConsoleIO } from "./console-io";
import { ConversationResponse, ConversationStatus } from "./conversation";
import { ConversationFactory } from "./base-conversation-handlers";

async function asyncRunTextbotInConsole(factory: ConversationFactory<any>) {
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

export function runTextbotInConsole(factory: ConversationFactory<any>) {
  asyncRunTextbotInConsole(factory).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
