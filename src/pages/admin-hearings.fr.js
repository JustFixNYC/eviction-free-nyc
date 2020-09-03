import Page from "../containers/AdminHearingPage";
export default Page;

export const pageQuery = graphql`
  query AdminHearingPageFrQuery {
    content: allContentfulAdminHearingPage(
      filter: { node_locale: { eq: "fr" } }
    ) {
      ...AdminHearingPageFragment
    }
  }
`;
