import React from "react";
import ButtonStep from "../ButtonStep";
import { injectIntl, FormattedMessage as Trans } from 'react-intl';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';


class StepCasetype extends React.Component {

  handleCaseButtonClick = (type) => {
    this.submitButton.focus();
    this.props.setCaseType(type);
  }

  render() {

    const { content, show, userCaseType, handleScreenerSubmit } = this.props;

    return (
      <div className={`ScreenerPage__Case ${show ? "" : "d-none"}`}>
        <ul className="step">
          <li className="step-item"><a href="#"><Trans id="step" /> 1</a></li>
          <li className="step-item"><a href="#"><Trans id="step" /> 2</a></li>
          <li className="step-item active"><a href="#"><Trans id="step" /> 3</a></li>
        </ul>
        <h4>{content.caseTitle}</h4>
        <p>{content.caseDescription}</p>
        <div className="ScreenerPage__CaseButtons">
          <button className={`btn btn-default ${userCaseType == 'nonpay' ? "active" : ""}`}
                  onClick={() => this.handleCaseButtonClick('nonpay')}>
              <Trans id="nonpay" />
          </button>
          <button className={`btn btn-default ${userCaseType == 'holdover' ? "active" : ""}`}
                  onClick={() => this.handleCaseButtonClick('holdover')}>
              <Trans id="holdover" />
          </button>
          <button className={`btn btn-default ${userCaseType == 'general' ? "active" : ""}`}
                  onClick={() => this.handleCaseButtonClick('general')}>
              <Trans id="unsure" />
          </button>
        </div>

        <Accordion>
          <AccordionItem>
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
                className={`btn btn-block btn-centered btn-primary ${userCaseType ? "" : "disabled"}`}
                onClick={handleScreenerSubmit}>
          <Trans id="submit" />
        </button>
      </div>
    );
  }
}

export default injectIntl(StepCasetype);
