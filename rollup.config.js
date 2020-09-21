import fs from "fs";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

const filenames = fs
  .readdirSync("src/serverless-functions")
  .filter((filename) => !filename.includes(".test."));

const config = filenames.map((filename) => ({
  input: `src/serverless-functions/${filename}`,
  output: {
    dir: "functions-build",
    format: "cjs",
    sourcemap: "inline",
  },
  external: [
    "path",
    "fs",
    "util",
    "url",
    "os",
    "http",
    "https",
    "stream",
    "zlib",
  ],
  plugins: [
    json(),
    nodeResolve({ extensions: [".js", ".ts", ".tsx"] }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      extensions: [".ts", ".tsx"],
    }),
  ],
}));

export default config;
