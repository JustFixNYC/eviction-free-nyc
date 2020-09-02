import Page from "../containers/ScreenerPage";
export default Page;

export const pageQuery = graphql`
  query ScreenerPageEsQuery {
    content: allContentfulScreenerPage(filter: { node_locale: { eq: "es" } }) {
      ...ScreenerPageFragment
    }
  }
`;
