// This was adapted from:
// https://github.com/toolness/justfix-interview-ts-fun/blob/master/lib/console/readline-io.ts

import readline from "readline";

export class ConsoleIO {
  private readonly outputStream: NodeJS.WriteStream = process.stdout;
  private readonly rl: readline.ReadLine;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: this.outputStream,
    });
  }

  writeLine(text: string) {
    this.outputStream.write(`${text}\n`);
  }

  question(query: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.rl.question(query, (answer) => {
        resolve(answer);
      });
    });
  }

  close() {
    this.rl.close();
  }
}
