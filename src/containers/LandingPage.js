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

const RTC_READ_MORE_LINK =
  "https://www.righttocounselnyc.org/ny_eviction_moratorium_faq";
const HCA_HOTLINE_LINK = "tel:12129624795";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.allLangs = props.data.langs.siteMetadata.languages.langs;
    this.otherLangs = this.allLangs.filter((l) => l !== props.intl.locale);

    this.content = props.data.content.edges[0].node;
  }

  render() {
    const isSpanish = this.props.intl.locale === "es";
    return (
      <section className="Page LandingPage ">
        <div className="LandingPage__Hero bg-secondary">
          <div className="LandingPage__HeroContent  container grid-md">
            <div className="LandingPage__LangSwitches">
              <Link
                to={isSpanish ? "/en-US" : "/es"}
                className="btn btn-link btn-default"
              >
                <Trans id={isSpanish ? "switch_en-US" : "switch_es"} />
              </Link>
            </div>
            <h2 className="LandingPage__HeroTitle">
              {this.content.hotlineTitle}
            </h2>
            <a
              href={HCA_HOTLINE_LINK}
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
              href={RTC_READ_MORE_LINK}
              target="_blank"
              className="btn btn-primary btn-large"
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
        heroTitle
        heroContent {
          childMarkdownRemark {
            html
          }
        }
        heroButtonText
        hotlineTitle
        hotlineCta
        hotlineDescription {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;
