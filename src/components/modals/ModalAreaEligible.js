import React from "react";
import { injectIntl, FormattedMessage as Trans } from 'react-intl';

const ModalAreaEligible = ({ content, zip, nextFn }) =>
  <div>
    <div className="modal-header">
      <h5 className="modal-title"><Trans id="zipTitle" /> {zip}</h5>
    </div>
    <div className="modal-body">
      <div className="content">
        {content.addressEligibleText}
      </div>
    </div>
    <div className="modal-footer">
      <button onClick={nextFn}
        className="btn btn-steps btn-block btn-centered">
        <Trans id="continue" />
      </button>
    </div>
  </div>

export default ModalAreaEligible;
