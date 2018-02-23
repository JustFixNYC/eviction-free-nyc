import React from "react"
import Link from "gatsby-link"
import * as PropTypes from "prop-types"
import Img from "gatsby-image"

const propTypes = {
  data: PropTypes.object.isRequired,
}

class IndexPage extends React.Component {
  render() {
    const usPageEdges = this.props.data.us.edges;

    return (
      <div style={{ marginBottom: rhythm(2) }}>
        <h2>Gatsby's integration with the Contentful Image API</h2>
        <h3>en-US</h3>
        {usPageEdges.map(({ node }, i) => (
          <div key={i}>
            <Link to={node.url} >{node.title}</Link>
          </div>
        ))}
      </div>
    )
  }
}

IndexPage.propTypes = propTypes

export default IndexPage

export const pageQuery = graphql`
  query PageEnUsQuery {
    us: allContentfulPage(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          id
          node_locale
          title
          url
        }
      }
    }
  }
`
