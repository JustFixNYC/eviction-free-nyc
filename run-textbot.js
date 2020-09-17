require("@babel/register")({
  ignore: [],
  extensions: [".ts", ".tsx", ".js"],
});
require("./src/textbot/run-in-console")
  .runChatbotInConsole()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
