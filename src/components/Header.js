import React from "react";
import Link from "gatsby-link";
import { injectIntl } from "react-intl";
import { FacebookButton, TwitterButton, EmailButton } from "react-social";

import "../styles/Header.scss";

import rtcLogo from "../assets/img/RTC_logo_scales.svg";
import fbIcon from "../assets/img/fb.svg";
import xTwitterIcon from "../assets/img/xTwitter.svg";

const isDemoSite = process.env.GATSBY_DEMO_SITE === "1";

const Header = ({ intl }) => (
  <header className="Header navbar">
    <section className="navbar-section navbar-brand">
      <h1>
        <Link to={`/${intl.locale}`}>
          Eviction Free NYC
        </Link>
      </h1>
    </section>
    <section className="navbar-section navbar-collab">
      By{" "}
        <a
          href="https://www.righttocounselnyc.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          the Right to Counsel Coalition
        </a>{" "}
        &{" "}
        <a
          href="https://justfix.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          JustFix
        </a>
    </section>
    <section className="navbar-section navbar-btns-social">
      <div className="btn-group btns-social">
        <FacebookButton
          className="btn btn-link"
          sharer={true}
          appId={`1023402221142410`}
          windowOptions={["width=400", "height=200"]}
        >
          <img src={fbIcon} className="icon mx-1" alt="Facebook" />
        </FacebookButton>
        <TwitterButton
          className="btn btn-link"
          message="If you're being evicted, we can help. Go to Eviction Free NYC today! @RTCNYC @JustFixOrg"
          windowOptions={["width=400", "height=200"]}
        >
          <img src={xTwitterIcon} className="icon mx-1" alt="X (Twitter)" />
        </TwitterButton>
        <EmailButton target="_blank" className="btn btn-link">
          <i className="icon icon-mail mx-2" />
        </EmailButton>
      </div>
    </section>
  </header>
);

export default injectIntl(Header);
