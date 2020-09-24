import React from "react";
import { injectIntl, FormattedMessage as Trans } from "react-intl";

import AddressSearch from "../AddressSearch";

const StepLocation = ({ content, show, handleNycha, handleZipcode, intl }) => (
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
    <AddressSearch
      onFormSubmit={handleZipcode}
      placeholder={intl.formatMessage({ id: "addrPlaceholder" })}
    />
    <button className="mt-2 btn btn-link" onClick={handleNycha}>
      {content.addressNychaOption}
    </button>
  </div>
);

export default injectIntl(StepLocation);
