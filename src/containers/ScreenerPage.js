import React from "react";
import * as PropTypes from "prop-types";
import { injectIntl, FormattedMessage as Trans } from 'react-intl';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import { isLocationEligible, determineResultPage } from '../utils/logic';
import AddressSearch from '../components/AddressSearch';
import Modal from '../components/Modal';

import '../styles/ScreenerPage.scss';

import searchIcon from '../assets/img/search.svg';

const propTypes = {
  data: PropTypes.object.isRequired,
}

const ButtonStep = ({ stepFn, children }) =>
  <button onClick={stepFn}
    className="btn btn-steps btn-block btn-centered">
    {children}
  </button>

class ScreenerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      user: {
        zip: null,
        boro: null,
        areaEligible: null,
        incomeEligible: null,
        caseType: null
      },
      showModal: false,
    };
  }

  componentDidMount() {


    // let loc = this.props.location.search.match(/step=(\d)/);
    // let defaultStep = (loc && loc[1]) ? parseInt(loc[1], 10) - 1 : 0;
    let defaultStep = 0;

    window.history.replaceState({ step: defaultStep }, null, `?step=${defaultStep+1}`);
    // this.setState({ currentPage: defaultStep });

    // console.log('replace step', 0);

    window.onpopstate = event => {

      // console.log('popstate event');
      if(event.state) {
        const toStep = event.state.step;

        // console.log('to step', toStep);

        if(this.state.currentPage == 0 && toStep == 0) {
          // the assumption here is that this is always a back move?
          // console.log('at beginning', event);
          // window.history.back();
        }
        else if(toStep !== null) {
          this.setState({ currentPage: toStep });
          // this.changeStep(toStep);
        }

      }

    }

  }

  componentWillUnmount() {
    // clear popstate
    window.onpopstate = () => {}
  }

  changeStep = (step) => {
    this.setState({ currentPage: step }, () => {
      // console.log('push step', step);
      if(step > 0) {
        window.history.pushState({ step: step }, null, `?step=${step+1}`);
      }
    });
  }

  handleZipcode = ({ zip, boro }) => {
    // console.log('zipcode is', zip);
    // console.log('boro is', boro);
    // console.log(isLocationEligible(zip));

    if(isLocationEligible(zip)) {
      this.setState({
        user: { ...this.state.user,
          zip: zip,
          boro: boro,
          areaEligible: true
        },
        showModal: true
      });
    } else {
      this.setState({
        user: { ...this.state.user,
          zip: zip,
          boro: boro,
          areaEligible: false
        }
      });
      this.changeStep(2);
    }
  }

  setIncome = (choice) => {
    if(choice) {
      this.setState({
        user: { ...this.state.user,
          incomeEligible: true
        }
      });
      this.changeStep(3);
    } else {
      this.setState({
        user: { ...this.state.user,
          incomeEligible: false
        },
        showModal: true
      });
    }

  }

  setCaseType = (type) => {
    this.setState({
      user: { ...this.state.user,
        caseType: type
      }
    });
  }

  onScreenerSubmit = () => {
    try {
      determineResultPage(this.state.user, this.props.intl);
    } catch(err) {
      this.changeStep(0);
    }
  }

  render() {

    const c = this.props.data.content.edges[0].node;
    // console.log(c);
    return (
      <section className="Page ScreenerPage">
        <div className={`ScreenerPage__Intro ${this.state.currentPage != 0 ? "d-none" : ""}`}>
          <img src={searchIcon} alt="search" />
          <h4>{c.introTitle}</h4>
          <ul>
            {c.introSteps.map((step,i) =>
              <li key={i}>{step}</li>
            )}
          </ul>
          <ButtonStep stepFn={() => this.changeStep(1)}><Trans id="continue" /></ButtonStep>
        </div>

        <div className={`ScreenerPage__Location ${this.state.currentPage != 1 ? "d-none" : ""}`}>
          <ul className="step">
            <li className="step-item active"><a href="#"><Trans id="step" /> 1</a></li>
            <li className="step-item"><a href="#"><Trans id="step" /> 2</a></li>
            <li className="step-item"><a href="#"><Trans id="step" /> 3</a></li>
          </ul>
          <h4>{c.addressTitle}</h4>
          <p>{c.addressDescription}</p>
          <AddressSearch onFormSubmit={this.handleZipcode} placeholder={this.props.intl.formatMessage({ id: "addrPlaceholder" })} />
        </div>

        <div className={`ScreenerPage__Income ${this.state.currentPage != 2 ? "d-none" : ""}`}>
          <ul className="step">
            <li className="step-item"><a href="#"><Trans id="step" /> 1</a></li>
            <li className="step-item active"><a href="#"><Trans id="step" /> 2</a></li>
            <li className="step-item"><a href="#"><Trans id="step" /> 3</a></li>
          </ul>
          <h4>{c.incomeTitle}</h4>
          <p>{c.incomeDescription}</p>
          <ul className="ScreenerPage__IncomeList">
            {c.incomeList.map((item,idx) =>
              <li key={idx}>{item}</li>
            )}
          </ul>
          <p>{c.incomeQuestion}</p>
          <button className="btn btn-steps" onClick={() => this.setIncome(true)}><Trans id="yes" /></button>
          <button className="btn btn-steps" onClick={() => this.setIncome(false)}><Trans id="no" /></button>
          <br />
          <br />
          <p className="text-aside"><i>{c.incomeDisclaimer}</i></p>
        </div>

        <div className={`ScreenerPage__Case ${this.state.currentPage != 3 ? "d-none" : ""}`}>
          <ul className="step">
            <li className="step-item"><a href="#"><Trans id="step" /> 1</a></li>
            <li className="step-item"><a href="#"><Trans id="step" /> 2</a></li>
            <li className="step-item active"><a href="#"><Trans id="step" /> 3</a></li>
          </ul>
          <h4>{c.caseTitle}</h4>
          <p>{c.caseDescription}</p>
          <div className="ScreenerPage__CaseButtons">
            <button className={`btn btn-default ${this.state.user.caseType == 'nonpay' ? "active" : ""}`}
                    onClick={() => this.setCaseType('nonpay')}>
                <Trans id="nonpay" />
            </button>
            <button className={`btn btn-default ${this.state.user.caseType == 'holdover' ? "active" : ""}`}
                    onClick={() => this.setCaseType('holdover')}>
                <Trans id="holdover" />
            </button>
            <button className={`btn btn-default ${this.state.user.caseType == 'unsure' ? "active" : ""}`}
                    onClick={() => this.setCaseType('general')}>
                <Trans id="unsure" />
            </button>
          </div>

          <Accordion>
            <AccordionItem>
              <AccordionItemTitle className="clearfix">
                <p className="float-left text-bold">{c.caseCourtPapersQuestion}</p>
                <i className="icon icon-plus float-right ml-2 mt-1"></i>
                <i className="icon icon-minus float-right ml-2 mt-1"></i>
              </AccordionItemTitle>
              <AccordionItemBody>
                <ul>
                  {c.courtPapersLinks.map((item, idx) =>
                    <li key={idx}><a href={item.file.url} target="_blank">{item.title}</a></li>
                  )}
                </ul>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>
          <button className={`btn btn-primary ${this.state.user.caseType ? "" : "disabled"}`}
                  onClick={() => this.onScreenerSubmit()}>
            <Trans id="submit" />
          </button>
        </div>

        <Modal showModal={this.state.showModal}
          onClose={() => this.setState({ showModal: false })}>
          {this.state.currentPage == 1 ? (
            <div>
              <div className="modal-header">
                <h5 className="modal-title">Your zipcode: {this.state.user.zip}</h5>
              </div>
              <div className="modal-body">
                <div className="content">
                  {c.addressEligibleText}
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={() => { this.setState({ showModal: false }); this.changeStep(2);  }}
                  className="btn btn-steps btn-block btn-centered">
                  <Trans id="continue" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="modal-body">
                <div className="content">
                  {c.incomeOverIncome}
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={() => { this.changeStep(3); this.setState({ showModal: false }); }}
                  className="btn btn-steps btn-block btn-centered">
                  <Trans id="gotit" />
                </button>
              </div>
            </div>
          )}
        </Modal>
      </section>
    )
  }
}

ScreenerPage.propTypes = propTypes;

export default injectIntl(ScreenerPage);

export const screenerPageFragment = graphql`
  fragment ScreenerPageFragment on ContentfulScreenerPageConnection {
    edges {
      node {
        node_locale
        pageTitle
        introTitle
        introSteps
        addressTitle
        addressDescription
        addressEligibleText
        incomeTitle
        incomeDescription
        incomeList
        incomeQuestion
        incomeDisclaimer
        incomeOverIncome
        caseTitle
        caseDescription
        caseCourtPapersQuestion
        courtPapersLinks {
          title
          file {
            url
          }
				}
      }
    }
  }
`
