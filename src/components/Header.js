import React from 'react';
import Link from 'gatsby-link';
import { injectIntl } from 'react-intl';
import SelectLanguage from './SelectLanguage';
import { FacebookButton, TwitterButton, EmailButton } from 'react-social';

import '../styles/Header.scss';

import fbIcon from '../assets/img/fb.svg';
import twitterIcon from '../assets/img/twitter.svg';

const Header = ({ intl }) => (
  <header className="Header navbar">
    <section className="navbar-section">
      <Link className="navbar-brand" to={`/${intl.locale}`}>Eviction Free NYC!</Link>
    </section>
    <section className="navbar-section">
      <div className="btn-group btns-social">
        <FacebookButton className="btn btn-link"
          sharer={true}
          appId={`1023402221142410`}
          windowOptions={['width=400', 'height=200']}>
          <img src={fbIcon} className="icon mx-1" alt="Facebook" />
        </FacebookButton>
        <TwitterButton className="btn btn-link"
          message="If you're being evicted, we can help. Go to Eviction Free NYC today! @RTCNYC @JustFixNYC"
          windowOptions={['width=400', 'height=200']}>
          <img src={twitterIcon} className="icon mx-1" alt="Twitter" />
        </TwitterButton>
        <EmailButton target="_blank"
          className="btn btn-link">
          <i className="icon icon-mail mx-2" />
        </EmailButton>
      </div>
    </section>
  </header>
)

export default injectIntl(Header);
