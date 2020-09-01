const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
// const graphql = require(`graphql`)

exports.create = (graphql, createPage) => {
  const pageTemplate = path.resolve(`./src/templates/page.js`);

  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Contentful graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
    graphql(
      `
        {
          allContentfulPage {
            edges {
              node {
                id
                node_locale
                url
              }
            }
          }
        }
      `
    ).then((result) => {
      if (result.errors) {
        reject(result.errors);
      }

      // Create Page pages
      _.each(result.data.allContentfulPage.edges, (edge) => {
        const pagePath = `/${edge.node.node_locale}/${edge.node.url}/`;

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
          context: {
            id: edge.node.id,
          },
        });
      });

      resolve();
    });
  });
};
