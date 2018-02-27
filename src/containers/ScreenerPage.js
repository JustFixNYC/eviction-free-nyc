import React from "react";
import * as PropTypes from "prop-types";

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
      currentPage: 0
    };
  }

  componentDidMount() {

    window.history.replaceState({ step: 0 }, null, '?step=1');
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

  render() {
    const c = this.props.data.content.edges[0].node;
    // console.log(c);
    return (
      <section className="Page ScreenerPage">
        <div className={`ScreenerPage__Intro ${this.state.currentPage != 0 ? "d-none" : ""}`}>
          <img src={searchIcon} alt="search" />
          <h4 className="text-center">{c.introTitle}</h4>
          <ul>
            {c.introSteps.map((step,i) =>
              <li key={i}>{step}</li>
            )}
          </ul>
          <ButtonStep stepFn={() => this.changeStep(1)}>Continue</ButtonStep>
        </div>
        <div className={`ScreenerPage__Location ${this.state.currentPage != 1 ? "d-none" : ""}`}>
          <p>step 2</p>
        </div>
        <div className={`ScreenerPage__Income ${this.state.currentPage != 2 ? "d-none" : ""}`}>

        </div>
        <div className={`ScreenerPage__Case ${this.state.currentPage != 3 ? "d-none" : ""}`}>

        </div>
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
      }
    }
  }
`
