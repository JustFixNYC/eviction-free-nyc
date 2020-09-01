export default from "../containers/AdminHearingPage";

export const pageQuery = graphql`
  query AdminHearingPageHtQuery {
    content: allContentfulAdminHearingPage(
      filter: { node_locale: { eq: "ht" } }
    ) {
      ...AdminHearingPageFragment
    }
  }
`;
