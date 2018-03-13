import React from "react";
import { FormattedMessage as Trans, injectIntl } from 'react-intl';
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
  constructor(props) {
    super(props);

    this.content = props.data.content.edges[0].node;
    this.faq = this.content.faq.map(item => ({
      title: item.title,
      html: item.content.childMarkdownRemark.html
    }));

  }


  render() {
    const c = this.content;
    return (
      <section className="Page LandingPage">
        <div className="LandingPage__Hero">
          <div className="LandingPage__HeroContent  container grid-md">
            <h2 className="LandingPage__HeroTitle">{c.heroTitle}</h2>
            <ButtonLink to={`/questions`} type="primary">
              {c.heroButtonText}
              <i className="icon icon-forward ml-2"></i>
            </ButtonLink>
            <Link to={this.props.intl.locale === 'en-US' ? `/es` : `/en-US`}
                  className="btn btn-block btn-default">
              <Trans id="langswitch" />
              <i className="icon icon-forward ml-2"></i>
            </Link>
          </div>
          <div className="LandingPage__HeroLearnMore">
            <span>{c.learnMoreTitle}</span><br /><i className="icon icon-arrow-down"></i>
          </div>
        </div>
        <div id="faq" className="LandingPage__Content container grid-md">
          <div className="columns clearfix">
            <div className="LandingPage__ContentFAQ column col-mr-auto col-sm-12 col-7">
              <h3>{c.learnMoreTitle}:</h3>
              <Accordion content={this.faq}></Accordion>
            </div>
            <div className="LandingPage__ContentImage1 column col-ml-auto col-sm-12 col-4">
              <Img
                alt={c.heroImage.title}
                sizes={c.heroImage.sizes}
              />
            </div>
            <div className="LandingPage__ContentImage2 column col-sm-12 col-4">
              <Img
                alt={c.secondaryImage.title}
                sizes={c.secondaryImage.sizes}
              />
            </div>
          </div>
        </div>
      </section>

    );
  }
}

LandingPage.propTypes = propTypes;

export default injectIntl(LandingPage);

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
            aspectRatio
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
        secondaryImage {
          title
          sizes(maxWidth: 613) {
            aspectRatio
            sizes
            src
            srcSet
          }
        }
      }
    }
  }
`
