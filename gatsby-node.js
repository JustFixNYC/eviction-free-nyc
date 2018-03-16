const _ = require(`lodash`);
const Promise = require(`bluebird`).
const path = require(`path`);
const generateBabelConfig = require("gatsby/dist/utils/babel-config");

const generalPages = require(`./factories/generalPage`)
const housingCourtPages = require(`./factories/housingCourtPage`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
//
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return Promise
    .all([
      generalPages.create(graphql, createPage),
      housingCourtPages.create(graphql, createPage)
    ])
    .catch(error => console.log('[Page factories error]', error));
};

exports.modifyBabelrc = ({ babelrc }) => ({
  ...babelrc,
  plugins: babelrc.plugins.concat(['transform-regenerator']),
});

// exports.modifyWebpackConfig = ({ config, stage }) => {
//   const program = {
//     directory: __dirname,
//     browserslist: ["> 1%", "last 2 versions", "IE >= 10"],
//   };
//
//   return generateBabelConfig(program, stage);
// };

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /react-phone-input/,
      loader: "null-loader",
    });
  }
};
