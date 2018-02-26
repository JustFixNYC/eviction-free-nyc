import React from "react";
import * as PropTypes from "prop-types";

import Link from "gatsby-link";
import ButtonLink from "../components/ButtonLink";

import '../styles/LandingPage.scss';

const propTypes = {
  data: PropTypes.object.isRequired,
}

class LandingPage extends React.Component {
  render() {
    const c = this.props.data.content.edges[0].node;
    console.log(c);
    return (
      <section className="Page LandingPage">
        <div className="LandingPage__Hero">
          <div className="LandingPage__HeroContent">
            <h1>{c.heroTitle}</h1>
            <ButtonLink to={`/page-xxx`} type="primary">
              {c.heroButtonText}
              <i className="icon icon-forward ml-2"></i>
            </ButtonLink>
          </div>
        </div>


      </section>

    );
  }
}

LandingPage.propTypes = propTypes;

export default LandingPage;

export const landingPageFragment = graphql`
  fragment LandingPageFragment on ContentfulLandingPageConnection {
    edges {
      node {
        id
        node_locale
        pageTitle
        heroTitle
        heroButtonText
        heroImage {
          sizes(maxWidth: 613) {
            sizes
            src
            srcSet
          }
        }
        learnMoreTitle
        faq {
          title
          content {
            childMarkdownRemark {
              html
            }
          }
        }
        rtcLogo {
          sizes(maxWidth: 613) {
            sizes
            src
            srcSet
          }
        }
        rtcAttribution {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
