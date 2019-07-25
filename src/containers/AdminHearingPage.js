import React from "react";
import * as PropTypes from "prop-types";
import { injectIntl, FormattedMessage as Trans } from 'react-intl';
import { addCallButtons } from '../utils/text';

import CourtPage from "./CourtPage";

const propTypes = {
  data: PropTypes.object.isRequired,
  qualifiedType: PropTypes.oneOf(['qualified', 'notQualified', 'qualifiedAdmin']),
}

class AdminHearingPage extends React.Component {
  constructor(props) {
    super(props);

    this.data = {};
    
    this.data.qualifiedType = 'qualifiedAdmin';

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

    this.data.providers = contentfulData.providers;

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
        providers {
          title
          acceptsRtcCases
          phoneNumber
          website
          hours
          intakeInstructions
          address
          logo {
            resolutions(width: 100, height: 100) {
              aspectRatio
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
  }
`
