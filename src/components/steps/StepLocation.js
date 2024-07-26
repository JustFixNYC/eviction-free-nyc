import React from "react";
import { injectIntl, FormattedMessage as Trans } from "react-intl";

import ButtonStep from "../ButtonStep";
import AddressSearch from "../AddressSearch";
import "../../styles/ScreenerPage.scss";

class StepLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNextDisabled: true,
    };
  }

  showNextBtn = () => {
    this.setState({ isNextDisabled: false });
  };

  render() {
    return (
      <div
        className={`ScreenerPage__Location ${this.props.show ? "" : "d-none"}`}
      >
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
        <h4>{this.props.content.addressTitle}</h4>
        <p>{this.props.content.addressDescription}</p>
        <AddressSearch
          onFormSubmit={this.props.handleZipcode}
          placeholder={this.props.intl.formatMessage({ id: "addrPlaceholder" })}
          showNextBtn={this.showNextBtn}
        />
        <button className="mt-2 btn btn-link" onClick={this.props.handleNycha}>
          {this.props.content.addressNychaOption}
        </button>
        {
          <ButtonStep
            className="continue-btn"
            isDisabled={this.state.isNextDisabled}
            stepFn={this.props.stepFn}
          >
            <Trans id="continue" />
          </ButtonStep>
        }
      </div>
    );
  }
}

export default injectIntl(StepLocation);
