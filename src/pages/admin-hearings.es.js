import Page from "../containers/AdminHearingPage";
export default Page;

export const pageQuery = graphql`
  query AdminHearingPageEsQuery {
    content: allContentfulAdminHearingPage(
      filter: { node_locale: { eq: "es" } }
    ) {
      ...AdminHearingPageFragment
    }
  }
`;
