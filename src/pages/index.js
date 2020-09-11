import React from "react";
// import graphql from 'graphql';
import { getUserLangKey } from "ptz-i18n";
import { Link } from "gatsby";
import { withPrefix } from "gatsby-link";

class RedirectIndex extends React.PureComponent {
  constructor(args) {
    super(args);

    // Skip build, Browsers only
    if (typeof window !== "undefined") {
      const { langs, defaultLangKey } = args.data.site.siteMetadata.languages;
      const langKey = getUserLangKey(langs, defaultLangKey);
      const homeUrl = withPrefix(`/${langKey}/`);

      // I don`t think this is the best solution
      // I would like to use Gatsby Redirects like:
      // https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redirects
      // But Gatsby Redirects are static, they need to be specified at build time,
      // This redirect is dynamic, It needs to know the user browser language.
      // Any ideias? Join the issue: https://github.com/angeloocana/gatsby-starter-default-i18n/issues/4
      // This doesn't work in Gatsby v2 because window.__history is undefined, so I'm commenting it out. -AV
      // window.___history.replace(homeUrl);
    }
  }

  render() {
    return (
      <div>
        TODO: We still need to re-implement locale redirection logic for Gatsby
        v2! For now, manually go to <Link to={"/en-US/"}>/en-US/</Link>.
      </div>
    );
  }
}

export default RedirectIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
  }
`;
