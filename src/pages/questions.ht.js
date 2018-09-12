export default from '../containers/ScreenerPage';

export const pageQuery = graphql`
  query ScreenerPageHtQuery {
    content: allContentfulScreenerPage(filter: { node_locale: { eq: "ht" } }) {
      ...ScreenerPageFragment
    }
  }
`
