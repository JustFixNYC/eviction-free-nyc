import React from "react";
import SelectLanguage from "./SelectLanguage";
import GetInvolved from "./GetInvolved";
import { FormattedHTMLMessage as HTMLTrans } from "react-intl";

import "../styles/Footer.scss";

import rtcLogo from "../assets/img/RTC_logo.png";
import justfixLogo from "../assets/img/Justfix_logo.jpg";

const Footer = (props) => (
  <div>
    <GetInvolved />
    <footer className="Footer">
      <img src={rtcLogo} alt={`Right to Counsel logo`} />
      <HTMLTrans id="attribution" />
      <div className="Footer_JustFix col-ml-auto">
          <HTMLTrans id="justfixAttribution" />
          <a href="https://www.justfix.org/" target="_blank">
            <img width="75" src={justfixLogo} alt={"JustFix"} />
          </a>
      </div>
    </footer>
  </div>
);

export default Footer;
