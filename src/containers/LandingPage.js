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

const MoratoriumWarning = () => (
  <div className="toast toast-warning text-left">
    NOTE: An Eviction Moratorium is in place in NY State due to the Covid-19 public health crisis. All courts that hear eviction cases are closed. 
    This means you cannot be evicted <span className="text-bold">for any reason</span>. 
    To learn more, go to the Right to Counsel Coalition’s Eviction <a className="text-bold" href="https://www.righttocounselnyc.org/moratorium_faq" target="_blank" rel="noopener noreferrer">
      Moratorium FAQs
    </a> page or call the Housing Court Answers hotline at 212-562-4795.
  </div>
);

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.allLangs = props.data.langs.siteMetadata.languages.langs;
    this.otherLangs = this.allLangs.filter(l => l !== props.intl.locale);

    this.content = props.data.content.edges[0].node;
    this.faq = this.content.faq.map(item => ({
      title: item.title,
      html: this.addGetStartedButton(item.content.childMarkdownRemark.html)
    }));

  }

  addGetStartedButton = (html) => {
    const locale = this.props.intl.locale;
    const buttonText = this.content.heroButtonText;
    return html += `
      <a class="btn btn-block btn-primary" href="/${locale}/questions">
        ${buttonText}
        <i class="icon icon-forward ml-2"></i>
      </a>
      <br />
    `;
  }


  render() {
    const c = this.content;
    return (
      <section className="Page LandingPage">
        <div className="LandingPage__Hero">
          <div className="LandingPage__HeroContent  container grid-md">
            <MoratoriumWarning />
            <h2 className="LandingPage__HeroTitle">{c.heroTitle}</h2>
            <h4 className="LandingPage__HeroSubtitle">{c.heroSubTitle}</h4>
            <ButtonLink to={`/questions`} type="primary">
              {c.heroButtonText}
              <i className="icon icon-forward ml-2"></i>
            </ButtonLink>
            <div className="LandingPage__LangSwitches">
              {this.otherLangs.map((lang, idx) => (
                <Link to={`/${lang}`} key={idx}
                      className="btn btn-block btn-default">
                  <Trans id={`switch_${lang}`} />
                  <i className="icon icon-forward ml-2"></i>
                </Link>
              ))}
            </div>
            <div className="LandingPage__HeroLearnMore">
              <div>{c.learnMoreTitle}</div><i className="icon icon-arrow-down"></i>
            </div>
          </div>
        </div>
        <div id="faq" className="LandingPage__Content container grid-md">
          <div className="columns clearfix">
            <div className="LandingPage__ContentFAQ column col-mr-auto col-sm-12 col-7">
              <h3>{c.learnMoreTitle}:</h3>
              <Accordion content={this.faq} />
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
        heroSubTitle
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
