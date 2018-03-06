import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider } from 'react-intl';
import Link from "gatsby-link"
import 'intl';

import Header from '../components/Header';
import Footer from '../components/Footer';

// Styles
import '../styles/main.scss';

import messagesEn from '../data/messages/en-US';
import messagesEs from '../data/messages/es';

const TemplateWrapper = ({ children, data, location, i18nMessages }) => {
  const url = location.pathname;
  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}/`;
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));

  // Hack for using dynamic template when params not passed to wrapper.
  if (i18nMessages === undefined) {
    if (langKey === 'es') {
      i18nMessages = messagesEs
    } else {
      i18nMessages = messagesEn
    }
  }

  return (
    <IntlProvider
      locale={langKey}
      messages={i18nMessages}
    >
      <div>
        <Helmet
          title="Eviction Free NYC"
          meta={[
            { name: 'description', content: 'Are you facing an eviction? You may have the right to a free lawyer!' },
            { name: 'keywords', content: 'lawyer, legal aid, housing, tenants, tenants rights, help, assistance, legal services, eviction, evicted' },
          ]}
        />

        <Header langs={langsMenu} />
        <main>
          {children()}
        </main>
        <Footer />

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
