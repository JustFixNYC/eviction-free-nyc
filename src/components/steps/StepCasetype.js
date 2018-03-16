import React from "react";
import ButtonStep from "../ButtonStep";
import { injectIntl, FormattedMessage as Trans } from 'react-intl';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

class StepcaseType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unsure: false
    };
  }


  handleCaseButtonClick = (type) => {
    this.submitButton.focus();
    this.props.setCaseType(type);
  }

  render() {

    const { content, show, user, handleScreenerSubmit } = this.props;

    return (
      <div className={`ScreenerPage__Case ${show ? "" : "d-none"}`}>
        <ul className="step">
          <li className="step-item"><a href="#"><Trans id="step" /> 1</a></li>
          <li className="step-item"><a href="#"><Trans id="step" /> 2</a></li>
          <li className="step-item active"><a href="#"><Trans id="step" /> 3</a></li>
        </ul>
        <h4>{content.caseTitle}</h4>
        <p>{content.caseDescription}</p>

        {user.nycha ? (
          <div className="ScreenerPage__CaseButtons">
            <button className={`btn btn-default ${user.caseType == 'nonpay' ? "active" : ""}`}
                    onClick={() => this.handleCaseButtonClick('nonpay')}>
                <Trans id="nonpay" />
            </button>
            <button className={`btn btn-default ${user.caseType == 'other' ? "active" : ""}`}
                    onClick={() => this.handleCaseButtonClick('other')}>
                <Trans id="other" />
            </button>
          </div>
        ) : (
          <div className="ScreenerPage__CaseButtons">
            <button className={`btn btn-default ${user.caseType == 'nonpay' ? "active" : ""}`}
                    onClick={() => this.handleCaseButtonClick('nonpay')}>
                <Trans id="nonpay" />
            </button>
            <button className={`btn btn-default ${user.caseType == 'holdover' ? "active" : ""}`}
                    onClick={() => this.handleCaseButtonClick('holdover')}>
                <Trans id="holdover" />
            </button>
            <button className={`btn btn-default ${user.caseType == 'general' ? "active" : ""}`}
                    onClick={() => { this.setState({ unsure: true }); this.handleCaseButtonClick('general'); }}>
                <Trans id="general" />
            </button>
          </div>
        )}

        <Accordion>
          <AccordionItem expanded={this.state.unsure}>
            <AccordionItemTitle className="clearfix">
              <p className="float-left text-bold">{content.caseCourtPapersQuestion}</p>
              <i className="icon icon-plus float-right ml-2 mt-1"></i>
              <i className="icon icon-minus float-right ml-2 mt-1"></i>
            </AccordionItemTitle>
            <AccordionItemBody>
              <ul>
                {content.courtPapersLinks.map((item, idx) =>
                  <li key={idx}><a href={item.file.url} target="_blank">{item.title}</a></li>
                )}
              </ul>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
        <button ref={ref => this.submitButton = ref}
                className={`btn btn-block btn-centered btn-primary ${user.caseType ? "" : "disabled"}`}
                onClick={handleScreenerSubmit}>
          <Trans id="submit" />
        </button>
      </div>
    );
  }
}

export default injectIntl(StepcaseType);
