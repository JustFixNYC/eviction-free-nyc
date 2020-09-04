import babel from "@rollup/plugin-babel";

const config = {
  input: "src/serverless-functions/hello-world.ts",
  output: {
    dir: "functions-build",
    format: "cjs",
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      extensions: [".ts"],
    }),
  ],
};

export default config;
