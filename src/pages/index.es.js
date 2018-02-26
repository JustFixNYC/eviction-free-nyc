export default from '../containers/LandingPage';

export const pageQuery = graphql`
  query LandingPageEsQuery {
    content: allContentfulLandingPage(filter: { node_locale: { eq: "es" } }) {
      ...LandingPageFragment
    }
  }
`
