import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl, FormattedMessage as Trans } from 'react-intl';

import Accordion from "../components/Accordion";

import '../styles/HousingCourtPage.scss';

const propTypes = {
  data: PropTypes.object.isRequired,
}

class PageTemplate extends React.Component {
  constructor(props) {
    super(props);

    const casetype = props.location.pathname.split('/')[3];

    this.qualified = casetype.substr(casetype.length - 3) === 'rtc';

    const contentfulData = props.data.allContentfulHousingCourtPage.edges[0].node;

    switch(casetype) {
      case 'nonpay':
        this.steps = contentfulData.stepsNonpayDoesntQualify;
        break;
      case 'nonpayrtc':
        this.steps = contentfulData.stepsNonpayQualifies;
        break;
      case 'holdover':
        this.steps = contentfulData.stepsHoldoverDoesntQualify;
        break;
      case 'holdoverrtc':
        this.steps = contentfulData.holdoverQualifySteps;
        break;
      case 'general':
        this.steps = contentfulData.stepsGeneral;
        break;
      default:
        this.steps = null;
        break;
    }

    this.steps = this.steps.map((step, i) => ({
        title: `${props.intl.formatMessage({ id: 'step' }) } ${i+1}: ${step.title}`,
        html: step.childContentfulHousingCourtActionStepContentTextNode.childMarkdownRemark.html
    }));

    if(contentfulData.additionalResources) {
      this.additionalResources = contentfulData.additionalResources.map((step, i) => ({
          title: step.title,
          html: step.childContentfulHousingCourtActionStepContentTextNode.childMarkdownRemark.html
      }));
    }


  }


  render() {
    return (
      <section className="Page HousingCourtPage container grid-md">
        <div className="HousingCourtPage_Header clearfix">
          <h3 className="float-left">
            <Trans id={this.qualified ? 'qualifiedTitle' : 'notQualifiedTitle'} />
          </h3>
          <button onClick={() => window.print()}
            className="btn btn-default float-right">Print</button>
        </div>

        <h6><Trans id="doNow" /></h6>
        <Accordion content={this.steps} multiple />
        {this.additionalResources && (
          <div>
            <h6><Trans id="additionalResources" /></h6>
            <Accordion content={this.additionalResources} multiple />
          </div>
        )}

      </section>
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
