import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl, FormattedMessage as Trans } from 'react-intl';
import { addCallButtons } from '../utils/text';

import CourtPage from "../containers/CourtPage";

const propTypes = {
  data: PropTypes.object.isRequired,
}

class PageTemplate extends React.Component {
  constructor(props) {
    super(props);

    const casetype = props.location.pathname.split('/')[4];

    this.data = {};

    this.data.qualified = casetype.substr(casetype.length - 3) === 'rtc';

    const contentfulData = props.data.allContentfulHousingCourtPage.edges[0].node;

    switch(casetype) {
      case 'nonpay':
        this.data.steps = contentfulData.stepsNonpayDoesntQualify;
        break;
      case 'nonpayrtc':
        this.data.steps = contentfulData.stepsNonpayQualifies;
        break;
      case 'holdover':
        this.data.steps = contentfulData.stepsHoldoverDoesntQualify;
        break;
      case 'holdoverrtc':
        this.data.steps = contentfulData.holdoverQualifySteps;
        break;
      case 'general':
        this.data.steps = contentfulData.stepsGeneral;
        break;
      default:
        this.data.steps = null;
        break;
    }

    this.data.steps = this.data.steps.map((step, i) => ({
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

PageTemplate.propTypes = propTypes;

export default injectIntl(PageTemplate);

export const pageQuery = graphql`
  query contentfulHousingCourtPageQuery(
    $id: String!,
    $stepsHoldover: Boolean!,
  	$stepsHoldoverRTC: Boolean!,
  	$stepsNonpay: Boolean!,
  	$stepsNonpayRTC: Boolean!,
  	$stepsGeneral: Boolean!
  ) {
    allContentfulHousingCourtPage(filter: { id: { eq: $id }}) {
      edges {
        node {
          id
          holdoverQualifySteps @include(if: $stepsHoldoverRTC) {
            title
            childContentfulHousingCourtActionStepContentTextNode {
              childMarkdownRemark {
                html
              }
            }
          }
          stepsHoldoverDoesntQualify @include(if: $stepsHoldover) {
            title
            childContentfulHousingCourtActionStepContentTextNode {
              childMarkdownRemark {
                html
              }
            }
          }
          stepsNonpayQualifies @include(if: $stepsNonpayRTC) {
            title
            childContentfulHousingCourtActionStepContentTextNode {
              childMarkdownRemark {
                html
              }
            }
          }
          stepsNonpayDoesntQualify @include(if: $stepsNonpay) {
            title
            childContentfulHousingCourtActionStepContentTextNode {
              childMarkdownRemark {
                html
              }
            }
          }
          stepsNychaQualifies @skip(if: true) {
            title
            childContentfulHousingCourtActionStepContentTextNode {
              childMarkdownRemark {
                html
              }
            }
          }
          stepsGeneral @include(if: $stepsGeneral)  {
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
  }
`
