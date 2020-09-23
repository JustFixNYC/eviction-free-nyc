import React from "react";
import * as PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import {
  isLocationEligible,
  isNychaEligible,
  determineResultPage,
} from "../utils/logic";
import { navigateTo } from "gatsby-link";

import StepIntro from "../components/steps/StepIntro";
import StepLocation from "../components/steps/StepLocation";
import StepNychaLocation from "../components/steps/StepNychaLocation";
import StepIncome from "../components/steps/StepIncome";
import StepCasetype from "../components/steps/StepCasetype";

import Modal from "../components/Modal";
import ModalAreaEligible from "../components/modals/ModalAreaEligible";
import ModalAreaIneligible from "../components/modals/ModalAreaIneligible";
import ModalIncomeEligible from "../components/modals/ModalIncomeEligible";
import ModalIncomeIneligible from "../components/modals/ModalIncomeIneligible";

import "../styles/ScreenerPage.scss";

const propTypes = {
  data: PropTypes.object.isRequired,
};

class ScreenerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      user: {
        zip: null,
        boro: null,
        nycha: false,
        areaEligible: null,
        incomeEligible: null,
        caseType: null,
      },
      showModal: false,
      modalType: null,
    };
  }

  componentDidMount() {
    let defaultStep = 0;
    window.history.replaceState(
      { step: defaultStep },
      null,
      `?step=${defaultStep + 1}`
    );

    window.onpopstate = (event) => {
      if (event.state) {
        const toStep = event.state.step;
        if (toStep !== null) {
          this.setState({ currentPage: toStep });
        }
      }
    };

    window.gtag("event", "scr-started");
  }

  componentWillUnmount() {
    // clear popstate?
    window.onpopstate = () => {};
  }

  changeStep = (nextStep) => {
    this.setState({ currentPage: nextStep }, () => {
      if (nextStep > 0) {
        window.history.pushState(
          { step: nextStep },
          null,
          `?step=${nextStep + 1}`
        );
      }
    });
    if (window) window.scrollTo(0, 0);
  };

  closeModalAndGoToNextStep = (stepOverride) => {
    const nextStep =
      typeof stepOverride == "number"
        ? stepOverride
        : this.state.currentPage + 1;
    this.setState({ modalType: null });
    this.changeStep(nextStep);
  };

  skipIncomeStep = (income) => {
    this.setState({ user: { ...this.state.user, incomeEligible: income } });
    this.closeModalAndGoToNextStep(3);
  };

  handleZipcode = ({ zip, boro }) => {
    let areaEligible = isLocationEligible(zip);
    this.setState({
      user: {
        ...this.state.user,
        zip: zip,
        boro: boro,
        nycha: false,
        areaEligible: areaEligible,
      },
      modalType: areaEligible ? "areaEligible" : "areaIneligible",
    });
  };

  handleNycha = ({ zips, boro }) => {
    let areaEligible = isNychaEligible(zips);
    this.setState({
      user: {
        ...this.state.user,
        zip: null,
        boro: boro,
        nycha: true,
        areaEligible: areaEligible,
      },
      modalType: areaEligible ? "areaEligible" : "areaIneligible",
    });
  };

  setIncome = (choice) => {
    this.setState(
      {
        user: { ...this.state.user, incomeEligible: choice },
        modalType: choice ? null : "incomeIneligible",
      },
      () => {
        // For incomeEligible tenants, we want to skip the modal and
        // just go to the caseType step
        if (!this.state.modalType) {
          this.changeStep(3);
        }
      }
    );
  };

  setCaseType = (type) => {
    this.setState({
      user: { ...this.state.user, caseType: type },
    });
  };

  handleScreenerSubmit = () => {
    try {
      let resultsURL = determineResultPage(this.state.user, this.props.intl);
      navigateTo(resultsURL);
    } catch (err) {
      Rollbar.error("Missing a step", this.state.user);
      this.changeStep(0);
    }
  };

  render() {
    const c = this.props.data.content.edges[0].node;

    return (
      <section className="Page ScreenerPage">
        <StepIntro
          content={c}
          show={this.state.currentPage == 0}
          stepFn={() => this.changeStep(1)}
        />

        <StepLocation
          content={c}
          show={this.state.currentPage == 1}
          handleZipcode={this.handleZipcode}
          handleNycha={() => this.changeStep(4)}
        />

        <StepNychaLocation
          content={c}
          show={this.state.currentPage == 4}
          handleNycha={this.handleNycha}
        />

        <StepIncome
          content={c}
          show={this.state.currentPage == 2}
          setIncome={this.setIncome}
        />

        <StepCasetype
          content={c}
          show={this.state.currentPage == 3}
          user={this.state.user}
          setCaseType={this.setCaseType}
          handleScreenerSubmit={this.handleScreenerSubmit}
        />

        <Modal
          showModal={this.state.modalType !== null}
          onClose={() => this.setState({ modalType: null })}
        >
          {this.state.modalType === "areaEligible" && (
            <ModalAreaEligible
              content={c}
              nycha={this.state.user.nycha}
              zip={this.state.user.zip}
              nextFn={() => {
                // Special handling here
                // If they are NYCHA, we shouldn't ask about income
                // Even if they are areaEligible
                if (this.state.user.nycha) {
                  this.skipIncomeStep(true);
                } else {
                  this.closeModalAndGoToNextStep(2);
                }
              }}
            />
          )}

          {this.state.modalType === "areaIneligible" && (
            <ModalAreaIneligible
              content={c}
              nycha={this.state.user.nycha}
              zip={this.state.user.zip}
              nextFn={() => this.skipIncomeStep(false)}
            />
          )}

          {this.state.modalType === "incomeEligible" && (
            <ModalIncomeEligible
              content={c}
              nextFn={this.closeModalAndGoToNextStep}
            />
          )}

          {this.state.modalType === "incomeIneligible" && (
            <ModalIncomeIneligible
              content={c}
              nextFn={this.closeModalAndGoToNextStep}
            />
          )}
        </Modal>
      </section>
    );
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
        addressNychaOption
        addressEligibleText
        addressIneligibleText
        addressNychaEligible
        addressNychaIneligible
        incomeTitle
        incomeDescription
        incomeList
        incomeQuestion
        incomeDisclaimer
        incomeEligibleText
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
`;
