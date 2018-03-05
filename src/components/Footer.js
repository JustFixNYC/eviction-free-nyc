import React from 'react'
import Link from 'gatsby-link'
import SelectLanguage from './SelectLanguage';
import { FormattedMessage as Trans, FormattedHTMLMessage as HTMLTrans } from 'react-intl';

import '../styles/Footer.scss';
import rtcLogo from '../assets/img/RTC_logo.png';

const Footer = (props) => (
  <footer className="Footer">
      <img src={rtcLogo} alt={`Right to Counsel`} />
      <HTMLTrans id="attribution" />
      <div className="col-ml-auto"><HTMLTrans id="justfixAttribution" /></div>


  </footer>
)

export default Footer;
