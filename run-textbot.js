require("@babel/register")({
  ignore: [],
  extensions: ['.ts', '.js'],
});
require("./src/textbot/run-in-console")
  .runChatbotInConsole()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
