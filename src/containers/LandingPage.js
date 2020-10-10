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

const HcaPhone = () => (
  <a
    href="tel:12129624795"
    target="_blank"
    className="text-bold"
    rel="noopener noreferrer"
  >
    212-962-4795
  </a>
);
const RtcEmail = () => (
  <a
    href="mailto:p.estupinan@newsettlement.org"
    target="_blank"
    rel="noopener noreferrer"
    className="text-bold"
  >
    p.estupinan@newsettlement.org
  </a>
);

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
      <section className="Page LandingPage bg-secondary">
        <div className="LandingPage__Hero">
          <div className="LandingPage__HeroContent  container grid-md">
            <h2 className="LandingPage__HeroTitle">
              {isSpanish
                ? "La moratoria que protegía a los inquilinos de Nueva York ha terminado."
                : "The moratorium protecting New Yorkers from eviction has expired."}
            </h2>
            <h4 className="LandingPage__HeroSubtitle">
              {isSpanish
                ? "Todos los casos de desalojo comenzarán el 12 de Octubre."
                : "All eviction cases can move forward starting October 12."}
            </h4>
            <ButtonLink
              to="https://www.righttocounselnyc.org/organizing_covid19"
              type="primary"
              size="large"
            >
              {isSpanish ? "Lea Noticias Recientes" : "Read Latest Updates"}
              <i className="icon icon-forward ml-2"></i>
            </ButtonLink>
            <br />
            {isSpanish ? (
              <p>
                Llame a la línea de asistencia Housing Court Answers en el{" "}
                <HcaPhone /> con preguntas legales o mande un email a{" "}
                <RtcEmail /> para recibir más información y recursos para luchar
                contra el desalojo.
              </p>
            ) : (
              <p>
                Call the Housing Court Answers hotline at <HcaPhone /> for legal
                questions or email <RtcEmail /> for more information or
                resources on how to fight evictions.
              </p>
            )}
            <div className="LandingPage__LangSwitches">
              <Link
                to={isSpanish ? "en-US" : "es"}
                className="btn btn-block btn-default"
              >
                <Trans id={isSpanish ? "switch_en-US" : "switch_es"} />
              </Link>
            </div>
            <br />
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
        moratoriumBanner {
          childMarkdownRemark {
            html
          }
        }
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
`;
