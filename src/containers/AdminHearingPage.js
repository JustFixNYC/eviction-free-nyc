import React from "react";
import * as PropTypes from "prop-types";
import { injectIntl, FormattedMessage as Trans } from 'react-intl';
import { addCallButtons } from '../utils/text';

import CourtPage from "./CourtPage";

const propTypes = {
  data: PropTypes.object.isRequired,
}

class AdminHearingPage extends React.Component {
  constructor(props) {
    super(props);

    this.data = {};

    this.data.qualified = false;

    const contentfulData = props.data.content.edges[0].node;

    this.data.steps = contentfulData.stepsGeneral.map((step, i) => ({
        title: `${props.intl.formatMessage({ id: 'step' }) } ${i+1}: ${step.title}`,
        html: addCallButtons(step.childContentfulHousingCourtActionStepContentTextNode.childMarkdownRemark.html)
    }));

    if(contentfulData.additionalResources) {
      this.data.additionalResources = contentfulData.additionalResources.map((step, i) => ({
          title: step.title,
          html: addCallButtons(step.childContentfulHousingCourtActionStepContentTextNode.childMarkdownRemark.html)
      }));
    }

  }


  render() {
    return (
      <CourtPage { ...this.data } />
    );
  }
}

AdminHearingPage.propTypes = propTypes;

export default injectIntl(AdminHearingPage);

export const adminHearingPageFragment = graphql`
  fragment AdminHearingPageFragment on ContentfulAdminHearingPageConnection {
    edges {
      node {
        stepsGeneral {
        	title
            childContentfulHousingCourtActionStepContentTextNode {
              childMarkdownRemark {
                html
              }
          }
        }
        additionalResources {
        	title
            childContentfulHousingCourtActionStepContentTextNode {
              childMarkdownRemark {
                html
              }
          }
        }
      }
    }
  }
`
