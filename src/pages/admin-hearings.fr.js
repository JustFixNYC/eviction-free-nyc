export default from '../containers/AdminHearingPage';

export const pageQuery = graphql`
  query AdminHearingPageFrQuery {
    content: allContentfulAdminHearingPage(filter: { node_locale: { eq: "fr" } }) {
      ...AdminHearingPageFragment
    }
  }
`
