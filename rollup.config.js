import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const config = {
  input: "src/serverless-functions/hello-world.ts",
  output: {
    dir: "functions-build",
    format: "cjs",
    sourcemap: "inline",
  },
  external: ["path", "fs"],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      extensions: [".ts"],
    }),
  ],
};

export default config;
