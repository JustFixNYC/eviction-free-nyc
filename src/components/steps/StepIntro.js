import React from "react";
import ButtonStep from "../ButtonStep";
import { injectIntl, FormattedMessage as Trans } from 'react-intl';

import searchIcon from '../../assets/img/search.svg';

const StepIntro = ({ content, show, stepFn }) =>
  <div className={`ScreenerPage__Intro ${show ? "" : "d-none"}`}>
    <img src={searchIcon} alt="search" />
    <h4 dangerouslySetInnerHTML={{ __html: content.introTitle }} />
    <ul>
      {content.introSteps.map((step,i) =>
        <li key={i}>{step}</li>
      )}
    </ul>
    <ButtonStep stepFn={stepFn}><Trans id="continue" /></ButtonStep>
  </div>

export default injectIntl(StepIntro);
