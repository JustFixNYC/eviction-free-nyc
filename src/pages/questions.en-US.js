import Page from "../containers/ScreenerPage";
export default Page;

export const pageQuery = graphql`
  query ScreenerPageEnUsQuery {
    content: allContentfulScreenerPage(
      filter: { node_locale: { eq: "en-US" } }
    ) {
      ...ScreenerPageFragment
    }
  }
`;
