import React from "react";
import * as PropTypes from "prop-types";

import Link from "gatsby-link";

import Hero from 'grommet/components/Hero';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';

const propTypes = {
  data: PropTypes.object.isRequired,
}

class LandingPage extends React.Component {
  render() {
    const c = this.props.data.content.edges[0].node;
    console.log(c);
    return (
      <div>
        <Hero>
          <Box align={`center`}>
            <h1>{c.heroTitle}</h1>
              <Link to={`/page-xxx`} className="grommetux-button grommetux-button--primary grommetux-button--disabled grommetux-button--plain">{c.heroButtonText}</Link>
          </Box>

        </Hero>
      </div>

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
