// @ts-check

require("@babel/register")({
  ignore: [],
  extensions: [".ts", ".tsx", ".js"],
});

const {
  EfnycConversationHandlers,
} = require("./src/textbot/efnyc/conversation-handlers");

require("./src/textbot/run-in-console")
  .runChatbotInConsole((options) => new EfnycConversationHandlers(options));
