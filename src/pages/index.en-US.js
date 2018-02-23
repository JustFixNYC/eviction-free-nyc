export default from '../containers/LandingPage';

export const pageQuery = graphql`
  query LandingPageEnUsQuery {
    content: allContentfulLandingPage(filter: { node_locale: { eq: "en-US" } }) {
      ...LandingPageFragment
    }
  }
`
