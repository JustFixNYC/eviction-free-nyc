import Page from "../containers/ScreenerPage";
export default Page;

export const pageQuery = graphql`
  query ScreenerPageHtQuery {
    content: allContentfulScreenerPage(filter: { node_locale: { eq: "ht" } }) {
      ...ScreenerPageFragment
    }
  }
`;
