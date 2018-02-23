import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider } from 'react-intl';
import Link from "gatsby-link"
import 'intl';

// Grommet
import App from 'grommet/components/App';
import Header from 'grommet/components/Header';

// Styles
import '../scss/main.scss';

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

  console.log('template wrapper');

  return (
    <IntlProvider
      locale={langKey}
      messages={i18nMessages}
    >
      <div>
        <Helmet
          title="Gatsby Default Starter"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />

        {
          // <Header langs={langsMenu} />
          // <div
          //   style={{
          //     margin: `0 auto`,
          //     marginTop: rhythm(1.5),
          //     marginBottom: rhythm(1.5),
          //     maxWidth: 650,
          //     paddingLeft: rhythm(3 / 4),
          //     paddingRight: rhythm(3 / 4),
          //   }}
          // >
          //   {children()}
          // </div>

        }



        <App centered={true}>
          <Header pad={`medium`}>Eviction Free NYC</Header>
          {children()}
        </App>

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
