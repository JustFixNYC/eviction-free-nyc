import React from "react";
import { FormattedMessage as Trans, injectIntl } from "react-intl";
import * as PropTypes from "prop-types";

import Link from "gatsby-link";
import Img from "gatsby-image";
import ButtonLink from "../components/ButtonLink";
import Accordion from "../components/Accordion";
import widont from "widont";
import "../styles/LandingPage.scss";

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
      html: this.addCtaButton(
        item.content.childMarkdownRemark.html,
        item.title.includes("income eligible")
          ? this.content.heroButtonText2
          : this.content.heroButtonText
      ),
    }));
  }

  componentDidMount() {
    window.gtag("event", "landing-page-view");
  }

  addCtaButton = (html, buttonText) => {
    const locale = this.props.intl.locale;
    return (html += `
      <a class="btn btn-block btn-primary" href="/${locale}/questions">
        ${buttonText}
        <i class="icon icon-forward ml-2"></i>
      </a>
      <br />
    `);
  };

  render() {
    const c = this.content;
    return (
      <section className="Page LandingPage">
        <div className="LandingPage__Hero">
          <div className="LandingPage__HeroContent  container grid-md">
            <h2 className="LandingPage__HeroTitle">
              {/* Hard coding title bc it's more of a pain to code a line break via Contentful*/}
              Are you facing an eviction in NYC? <br /> You may have a right to
              a free lawyer!
            </h2>
            <h4 className="LandingPage__HeroSubtitle">{c.heroSubTitle}</h4>
            <ButtonLink to={`/questions`} type="primary">
              {c.heroButtonText}
              <i className="icon icon-forward ml-2"></i>
            </ButtonLink>
          </div>
        </div>
        <div id="faq" className="LandingPage__Content container grid-md">
          <div className="columns clearfix">
            <div className="LandingPage__ContentFAQ column col-mr-auto col-sm-12 col-7">
              <h3>{c.learnMoreTitle}:</h3>
              <p style={{ "font-style": "italic" }}>
                This resource is regularly updated by the Right to Counsel
                Coalition and JustFix as court procedures change.
              </p>
              <Accordion content={this.faq} />
            </div>
            <div className="LandingPage__ContentImage1 column col-ml-auto col-sm-12 col-4">
              <Img alt={c.heroImage.title} sizes={c.heroImage.sizes} />
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
        heroButtonText2
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
`;
