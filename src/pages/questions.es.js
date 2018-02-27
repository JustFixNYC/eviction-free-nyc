export default from '../containers/ScreenerPage';

export const pageQuery = graphql`
  query ScreenerPageEsQuery {
    content: allContentfulScreenerPage(filter: { node_locale: { eq: "es" } }) {
      ...ScreenerPageFragment
    }
  }
`
