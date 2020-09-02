import Page from "../containers/LandingPage";
export default Page;

export const pageQuery = graphql`
  query LandingPageEsQuery {
    langs: site {
      siteMetadata {
        languages {
          langs
        }
      }
    }
    content: allContentfulLandingPage(filter: { node_locale: { eq: "es" } }) {
      ...LandingPageFragment
    }
  }
`;
