const _ = require(`lodash`);
const Promise = require(`bluebird`);

const generalPages = require(`./factories/generalPage`);
const housingCourtPages = require(`./factories/housingCourtPage`);

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
//
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return Promise.all([
    generalPages.create(graphql, createPage),
    housingCourtPages.create(graphql, createPage),
  ]).catch((error) => console.log("[Page factories error]", error));
};
