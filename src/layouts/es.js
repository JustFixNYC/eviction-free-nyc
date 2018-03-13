import React from 'react';
import graphql from 'graphql';
import Layout from './index';
import { addLocaleData } from 'react-intl';

import messages from '../static/messages/es';
import es from 'react-intl/locale-data/es';
import 'intl/locale-data/jsonp/es';

addLocaleData(es);

export default (props) => (
  <Layout
    {...props}
    i18nMessages={messages}
  />);

export const pageQuery = graphql`
  query LayoutEs {
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
