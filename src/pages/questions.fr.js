import Page from "../containers/ScreenerPage";
export default Page;

export const pageQuery = graphql`
  query ScreenerPageFrQuery {
    content: allContentfulScreenerPage(filter: { node_locale: { eq: "fr" } }) {
      ...ScreenerPageFragment
    }
  }
`;
