const languages = require('./src/data/languages');
const autoprefixer = require('autoprefixer');

module.exports = {
  siteMetadata: {
    title: `Gatsby with Contentful`,
    languages
  },
  plugins: [
    `gatsby-plugin-core-js`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `p7o2rk07b5kj`,
        accessToken: `85707e698ac8df8816c56effecbbcf050ffc2a1f8646e0675b1e7def94f257c1`,
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: languages.defaultLangKey,
        useLangKeyLayout: false
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: 'custom-sass-loader',
      options: {
        postCssPlugins: [
          autoprefixer({
            browsers: ['last 2 versions'],
          })
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-67069242-4",
        // Puts tracking script in the head instead of the body
        head: false
      }
    },
    // `gatsby-plugin-offline`
  ]
};
