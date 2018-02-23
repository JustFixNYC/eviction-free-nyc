import React from "react"
import * as PropTypes from "prop-types"

const propTypes = {
  data: PropTypes.object.isRequired,
}

class PageTemplate extends React.Component {
  render() {

    const { title, pageContent } = this.props.data.contentfulPage;

    return (
      <div>
        <h1>{title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: pageContent.childMarkdownRemark.html,
          }}
        />
      </div>
    );
  }
}

PageTemplate.propTypes = propTypes;

export default PageTemplate;

export const pageQuery = graphql`
  query contentfulPageQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      title
      pageContent {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
