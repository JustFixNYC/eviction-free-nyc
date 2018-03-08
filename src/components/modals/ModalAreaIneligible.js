import React from "react";
import { injectIntl, FormattedMessage as Trans } from 'react-intl';

const ModalAreaIneligible = ({ content, nycha, zip, nextFn }) =>
  <div>
    {zip && (
      <div className="modal-header">
        <h5 className="modal-title"><Trans id="zipTitle" /> {zip}</h5>
      </div>
    )}
    <div className="modal-body">
      <div className="content">
        {nycha ? content.addressNychaIneligible : content.addressIneligibleText}
      </div>
    </div>
    <div className="modal-footer">
      <button onClick={nextFn}
        className="btn btn-steps btn-block btn-centered">
        <Trans id="continue" />
      </button>
    </div>
  </div>

export default ModalAreaIneligible;
