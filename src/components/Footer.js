import React from "react";
import SelectLanguage from "./SelectLanguage";
import GetInvolved from "./GetInvolved";
import { FormattedHTMLMessage as HTMLTrans } from "react-intl";

import "../styles/Footer.scss";
import rtcLogo from "../assets/img/RTC_logo.png";
import justfixLogo from "../assets/img/justfix_logo_bound.jpg";

const Footer = (props) => (
  <div>
    <GetInvolved />
    <footer className="Footer">
      <img src={rtcLogo} alt={`Right to Counsel logo`} />
      <HTMLTrans id="attribution" />

      <div className="Footer_JustFix col-ml-auto">
        <SelectLanguage {...props} />
        <HTMLTrans id="justfixAttribution" />
        <a href="https://www.justfix.org/" target="_blank">
          <img src={justfixLogo} alt={`JustFix logo`} />
        </a>
        <a href="https://www.netlify.com" target="_blank" className="hide-sm">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-light.svg"
            width="75"
          />
        </a>
      </div>
    </footer>
  </div>
);

export default Footer;
