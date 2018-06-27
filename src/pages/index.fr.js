export default from '../containers/LandingPage';

export const pageQuery = graphql`
  query LandingPageFrQuery {
    langs: site {
      siteMetadata {
        languages {
          langs
        }
      }
    }
    content: allContentfulLandingPage(filter: { node_locale: { eq: "fr" } }) {
      ...LandingPageFragment
    }
  }
`
