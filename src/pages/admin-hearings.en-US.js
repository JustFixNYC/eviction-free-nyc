export default from '../containers/AdminHearingPage';

export const pageQuery = graphql`
  query AdminHearingPageEnUsQuery {
    content: allContentfulAdminHearingPage(filter: { node_locale: { eq: "en-US" } }) {
      ...AdminHearingPageFragment
    }
  }
`
