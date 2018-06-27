export default from '../containers/ScreenerPage';

export const pageQuery = graphql`
  query ScreenerPageFrQuery {
    content: allContentfulScreenerPage(filter: { node_locale: { eq: "fr" } }) {
      ...ScreenerPageFragment
    }
  }
`
