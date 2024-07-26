import React from "react";
import { injectIntl, FormattedMessage as Trans } from "react-intl";

const StepIncome = ({ content, show, setIncome }) => (
  <div className={`ScreenerPage__Income ${show ? "" : "d-none"}`}>
    <ul className="step">
      <li className="step-item">
        <a href="#">
          <Trans id="step" /> 1
        </a>
      </li>
      <li className="step-item active">
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
    <h4>{content.incomeTitle}</h4>
    <p>{content.incomeDescription}</p>
    <p>
      {content.incomeUpdatedList.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </p>
    <p>{content.incomeQuestion}</p>
    <button className="btn btn-steps" onClick={() => setIncome(true)}>
      <Trans id="yes" />
    </button>
    <button className="btn btn-steps" onClick={() => setIncome(false)}>
      <Trans id="no" />
    </button>
    <br />
    <br />
    <p className="text-aside">
      <i>{content.incomeDisclaimer}</i>
    </p>
  </div>
);

export default injectIntl(StepIncome);
