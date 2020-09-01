export default from "../containers/AdminHearingPage";

export const pageQuery = graphql`
  query AdminHearingPageEsQuery {
    content: allContentfulAdminHearingPage(
      filter: { node_locale: { eq: "es" } }
    ) {
      ...AdminHearingPageFragment
    }
  }
`;
