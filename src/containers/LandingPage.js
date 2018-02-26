import React from "react";
import * as PropTypes from "prop-types";

import Link from "gatsby-link";
import Img from "gatsby-image";
import ButtonLink from "../components/ButtonLink";
import Accordion from "../components/Accordion";

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
            <ButtonLink to={`/page-xxx`} type="primary" size="large">
              {c.heroButtonText}
              <i className="icon icon-forward ml-2"></i>
            </ButtonLink>
          </div>
        </div>
        <div className="LandingPage__Content container grid-lg">
          <div className="columns">
            <div className="LandingPage__ContentFAQ column col-sm-12 col-7">
              <h3>{c.learnMoreTitle}</h3>
              <Accordion content={c.faq}></Accordion>
            </div>
            <div className="LandingPage__ContentImage1 column col-ml-auto col-sm-12 col-4">
              <Img
                key={c.heroImage.sizes.src}
                alt={c.heroImage.title}
                sizes={{...c.heroImage.sizes, aspectRatio: 4/3}}
              />
            </div>
            <div className="LandingPage__ContentImage2 column col-ml-auto col-sm-12 col-4">
              Img 2
            </div>
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
          title
          sizes(maxWidth: 613) {
            ...GatsbyContentfulSizes_noBase64
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
