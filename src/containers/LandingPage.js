import React from "react";
import { FormattedMessage as Trans, injectIntl } from "react-intl";
import * as PropTypes from "prop-types";

import Link from "gatsby-link";
import Img from "gatsby-image";
import ButtonLink from "../components/ButtonLink";
import Accordion from "../components/Accordion";
import widont from "widont";
import "../styles/LandingPage.scss";
import CommunityGroups from "../components/CommunityGroups";

const propTypes = {
  data: PropTypes.object.isRequired,
};

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.allLangs = props.data.langs.siteMetadata.languages.langs;
    this.otherLangs = this.allLangs.filter((l) => l !== props.intl.locale);

    this.content = props.data.content.edges[0].node;
    this.faq = this.content.faq.map((item) => ({
      title: item.title,
      html: this.addGetStartedButton(item.content.childMarkdownRemark.html),
    }));
  }

  addGetStartedButton = (html) => {
    const locale = this.props.intl.locale;
    const buttonText = this.content.heroButtonText;
    return (html += `
      <a class="btn btn-block btn-primary" href="/${locale}/questions">
        ${buttonText}
        <i class="icon icon-forward ml-2"></i>
      </a>
      <br />
    `);
  };

  render() {
    const isSpanish = this.props.intl.locale === "es";
    return (
      <section className="Page LandingPage ">
        <div className="LandingPage__Hero bg-secondary">
          <div className="LandingPage__HeroContent  container grid-md">
            <div className="LandingPage__LangSwitches">
              <Link
                to={isSpanish ? "/en-US" : "/es"}
                className="btn btn-block btn-default"
              >
                <Trans id={isSpanish ? "switch_en-US" : "switch_es"} />
              </Link>
            </div>
            <h2 className="LandingPage__HeroTitle">
              {this.content.hotlineTitle}
            </h2>
            <a
              href="tel:12129624795"
              target="_blank"
              className="btn btn-block btn-primary btn-large"
              rel="noopener noreferrer"
            >
              {this.content.hotlineCta}
            </a>
            <div
              dangerouslySetInnerHTML={{
                __html: this.content.hotlineDescription.childMarkdownRemark
                  .html,
              }}
            />
            <br />
          </div>
        </div>
        <div className="LandingPage__Hero">
          <div className="LandingPage__HeroContent  container grid-md">
            <h2 className="LandingPage__HeroTitle">{this.content.heroTitle}</h2>
            <div
              className="LandingPage__HeroSubtitle"
              dangerouslySetInnerHTML={{
                __html: this.content.heroContent.childMarkdownRemark.html,
              }}
            />
            <a
              href="https://www.righttocounselnyc.org/organizing_covid19"
              target="_blank"
              className="btn btn-block btn-primary btn-large"
              rel="noopener noreferrer"
            >
              {this.content.heroButtonText}
              <i className="icon icon-forward ml-2"></i>
            </a>
          </div>
        </div>
        <div className="accordion__item">
          <CommunityGroups />
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
        moratoriumBanner {
          childMarkdownRemark {
            html
          }
        }
        heroTitle
        heroSubTitle
        heroContent {
          childMarkdownRemark {
            html
          }
        }
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
        hotlineTitle
        hotlineCta
        hotlineDescription {
          childMarkdownRemark {
            html
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
`;
