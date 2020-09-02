import Page from "../containers/AdminHearingPage";
export default Page;

export const pageQuery = graphql`
  query AdminHearingPageEnUsQuery {
    content: allContentfulAdminHearingPage(
      filter: { node_locale: { eq: "en-US" } }
    ) {
      ...AdminHearingPageFragment
    }
  }
`;
