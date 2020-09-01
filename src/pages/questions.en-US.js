export default from "../containers/ScreenerPage";

export const pageQuery = graphql`
  query ScreenerPageEnUsQuery {
    content: allContentfulScreenerPage(
      filter: { node_locale: { eq: "en-US" } }
    ) {
      ...ScreenerPageFragment
    }
  }
`;
