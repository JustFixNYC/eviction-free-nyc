import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider } from 'react-intl';
import Link from "gatsby-link"
import 'intl';
import '../utils/locales';

import Header from '../components/Header';
import Footer from '../components/Footer';

import metaPhoto from '../assets/img/EFNYC_photo.jpg';

// Styles
import '../styles/main.scss';

const TemplateWrapper = ({ children, data, location }) => {
  const url = location.pathname;
  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}/`;
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));

  // get the appropriate message file based on langKey
  // at the moment this assumes that langKey will provide us
  // with the appropriate language code
  const i18nMessages = require(`../data/messages/${langKey}`);

  return (
    <IntlProvider
      locale={langKey}
      key={langKey}
      messages={i18nMessages}
    >
      <div>

        {/*
          // title="Eviction Free NYC"
          // meta={[
          //   { name: 'description', content: 'Are you facing an eviction? You may have the right to a free lawyer!' },
          //   { name: 'keywords', content: 'lawyer, legal aid, housing, tenants, tenants rights, help, assistance, legal services, eviction, evicted' },
          // ]}

           */}
        <Helmet>
          <title>Respond to an Eviction Notice and Get Free Legal Help | Eviction Free NYC!</title>


          {/* <!-- Semantic META --> */}
        	<meta name="keywords" content="lawyer, legal aid, housing, tenants, tenants rights, help, assistance, legal services, eviction, evicte" />
        	<meta name="description" content="Are you facing an eviction? You may have the right to a free lawyer! Eviction Free NYC will help you learn how to respond to an eviction notice and connect with available resources." />

        	{/* <!-- Facebook META --> */}
        	<meta property="fb:app_id" content="1023402221142410" />
        	<meta property="og:site_name" content="Eviction Free NYC" />
        	<meta property="og:title" content="Are you facing an eviction? You may have the right to a free lawyer!" />
        	<meta property="og:description" content="Eviction Free NYC will help you learn how to respond to an eviction notice and connect with available resources." />
        	<meta property="og:url" content="https://www.evictionfreenyc.org" />
        	<meta property="og:image" content={`https://www.evictionfreenyc.org${metaPhoto}`} />
        	<meta property="og:type" content="website" />

        	{/* <!-- Twitter META --> */}
        	<meta name="twitter:card" content="summary_large_image" />
        	<meta name="twitter:title" content="Are you facing an eviction? You may have the right to a free lawyer!" />
        	<meta name="twitter:description" content="Eviction Free NYC will help you learn how to respond to an eviction notice and connect with available resources." />
        	<meta name="twitter:url" content="https://www.evictionfreenyc.org" />
        	<meta name="twitter:image" content={`https://www.evictionfreenyc.org${metaPhoto}`} />

        </Helmet>

        <Header langs={langsMenu} />
        <main>
          {children()}
        </main>
        <Footer langs={langsMenu} />

      </div>
    </IntlProvider>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
  query Layout {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
  }
`;
