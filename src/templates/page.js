import React from "react";
import * as PropTypes from "prop-types";
import TemplateWrapper from "../layouts";

const propTypes = {
  data: PropTypes.object.isRequired,
};

class PageTemplate extends React.Component {
  render() {
    const { title, pageContent } = this.props.data.contentfulPage;

    return (
      <TemplateWrapper>
      <section className="Page container grid-md">
        <h2>{title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: pageContent.childMarkdownRemark.html,
          }}
        />
      </section>
      </TemplateWrapper>
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
`;
