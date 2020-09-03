import React from "react";
import { injectIntl, FormattedMessage as Trans } from "react-intl";

const ModalIncomeEligible = ({ content, nextFn }) => (
  <div>
    <div className="modal-body">
      <div className="content">{content.incomeEligibleText}</div>
    </div>
    <div className="modal-footer">
      <button onClick={nextFn} className="btn btn-steps btn-block btn-centered">
        <Trans id="gotit" />
      </button>
    </div>
  </div>
);

export default ModalIncomeEligible;
