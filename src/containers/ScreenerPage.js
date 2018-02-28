import React from "react";
import * as PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';

import { isLocationEligible } from '../utils/logic';
import AddressSearch from '../components/AddressSearch';
import Modal from '../components/Modal';

import '../styles/ScreenerPage.scss';

import searchIcon from '../assets/img/search.svg';

const propTypes = {
  data: PropTypes.object.isRequired,
}

const ButtonStep = ({ stepFn, children }) =>
  <button onClick={stepFn}
    className="btn btn-lg btn-secondary btn-block btn-centered">
    {children}
  </button>

class ScreenerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      user: {
        boro: null,
        areaEligible: null,
        incomeEligible: null,
        caseType: null
      },
      showEligibleModal: false
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
    console.log('zipcode is', zip);
    console.log('boro is', boro);
    console.log(isLocationEligible(zip));

    if(isLocationEligible(zip)) {
      this.setState({
        user: {
          boro: boro,
          areaEligible: true
        },
        showEligibleModal: true
      });
    } else {
      this.setState({
        user: {
          boro: boro,
          areaEligible: false
        }
      });
      this.changeStep(2);
    }
  }

  render() {
    const c = this.props.data.content.edges[0].node;
    console.log(c);
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
          <ButtonStep stepFn={() => this.changeStep(1)}><FormattedMessage id="continue" /></ButtonStep>
        </div>

        <div className={`ScreenerPage__Location ${this.state.currentPage != 1 ? "d-none" : ""}`}>
          <ul className="step">
            <li className="step-item active"><a href="#" className="tooltip" data-tooltip="Step 1">Step 1</a></li>
            <li className="step-item"><a href="#" className="tooltip" data-tooltip="Step 2">Step 2</a></li>
            <li className="step-item"><a href="#" className="tooltip" data-tooltip="Step 3">Step 3</a></li>
          </ul>
          <h4>{c.addressTitle}</h4>
          <p>{c.addressDescription}</p>
          <AddressSearch onFormSubmit={this.handleZipcode} />
        </div>

        <div className={`ScreenerPage__Income ${this.state.currentPage != 2 ? "d-none" : ""}`}>
          <ul className="step">
            <li className="step-item"><a href="#" className="tooltip" data-tooltip="Step 1">Step 1</a></li>
            <li className="step-item active"><a href="#" className="tooltip" data-tooltip="Step 2">Step 2</a></li>
            <li className="step-item"><a href="#" className="tooltip" data-tooltip="Step 3">Step 3</a></li>
          </ul>
          <h4>{c.incomeTitle}</h4>
          <p>{c.incomeDescription}</p>
          <p>{c.incomeQuestion}</p>
          <ButtonStep stepFn={() => this.changeStep(3)}><FormattedMessage id="continue" /></ButtonStep>
        </div>

        <div className={`ScreenerPage__Case ${this.state.currentPage != 3 ? "d-none" : ""}`}>
          <ul className="step">
            <li className="step-item"><a href="#" className="tooltip" data-tooltip="Step 1">Step 1</a></li>
            <li className="step-item"><a href="#" className="tooltip" data-tooltip="Step 2">Step 2</a></li>
            <li className="step-item active"><a href="#" className="tooltip" data-tooltip="Step 3">Step 3</a></li>
          </ul>
          <h4>{c.caseTitle}</h4>
          <p>{c.caseDescription}</p>
        </div>

        <Modal
          showModal={this.state.showEligibleModal}
          onClose={() => this.setState({ showEligibleModal: false })}>
          <div className="modal-body">
            <div className="content">
              {c.addressEligibleText}
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={() => { this.changeStep(2); this.setState({ showEligibleModal: false }); }}
              className="btn btn-primary btn-block btn-centered">
              <FormattedMessage id="continue" />
            </button>
          </div>
        </Modal>
      </section>
    )
  }
}

ScreenerPage.propTypes = propTypes;

export default ScreenerPage;

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
        caseCourtPapersLinks {
          list {
            url
            name
          }
        }
      }
    }
  }
`
