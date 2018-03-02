const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)

const BOROUGHS = ['brooklyn', 'queens', 'manhattan', 'bronx', 'staten'];
const CASETYPES = ['nonpay', 'nonpayrtc', 'holdover', 'holdoverrtc', 'general'];

exports.create = (graphql, createPage) => {

  const pageTemplate = path.resolve(`./src/templates/housingCourtPage.js`);

  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Contentful graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
    graphql(
      `
        {
          allContentfulHousingCourtPage {
          	edges {
          		node {
                node_locale
                id
                boroughKey
          		}
          	}
          }
        }
      `
    )
    .then(result => {

      if (result.errors) {
        reject(result.errors);
      }

      // Create Page pages
      // Each edge is a housing court location in a particular language
      _.each(result.data.allContentfulHousingCourtPage.edges, edge => {


        _.each(CASETYPES, casetype => {

          const pagePath = `/${edge.node.node_locale}/${edge.node.boroughKey}/${casetype}`;

          const pageContext = {
            id: edge.node.id,
            stepsHoldover: casetype === 'holdover',
            stepsHoldoverRTC: casetype === 'holdoverrtc',
            stepsNonpay: casetype === 'nonpay',
            stepsNonpayRTC: casetype === 'nonpayrtc',
            stepsGeneral: casetype === 'general'
          };

          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: pagePath,
            component: pageTemplate,
            context: pageContext,
          });

        })

      });

      resolve();
    });
  });
}
