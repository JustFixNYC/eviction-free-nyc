import React from "react";
import { injectIntl, FormattedMessage as Trans } from "react-intl";

import NychaSearch from "../NychaSearch";

const StepNychaLocation = ({ content, show, handleNycha, intl }) => (
  <div className={`ScreenerPage__Location ${show ? "" : "d-none"}`}>
    <ul className="step">
      <li className="step-item active">
        <a href="#">
          <Trans id="step" /> 1
        </a>
      </li>
      <li className="step-item">
        <a href="#">
          <Trans id="step" /> 2
        </a>
      </li>
      <li className="step-item">
        <a href="#">
          <Trans id="step" /> 3
        </a>
      </li>
    </ul>
    <h4>{content.addressTitle}</h4>
    <p>{content.addressDescription}</p>
    <NychaSearch
      onFormSubmit={handleNycha}
      placeholder={intl.formatMessage({ id: "nychaPlaceholder" })}
    />
  </div>
);

export default injectIntl(StepNychaLocation);
