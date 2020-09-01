export default from "../containers/LandingPage";

export const pageQuery = graphql`
  query LandingPageEnUsQuery {
    langs: site {
      siteMetadata {
        languages {
          langs
        }
      }
    }
    content: allContentfulLandingPage(
      filter: { node_locale: { eq: "en-US" } }
    ) {
      ...LandingPageFragment
    }
  }
`;
