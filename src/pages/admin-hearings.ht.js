import Page from "../containers/AdminHearingPage";
export default Page;

export const pageQuery = graphql`
  query AdminHearingPageHtQuery {
    content: allContentfulAdminHearingPage(
      filter: { node_locale: { eq: "ht" } }
    ) {
      ...AdminHearingPageFragment
    }
  }
`;
