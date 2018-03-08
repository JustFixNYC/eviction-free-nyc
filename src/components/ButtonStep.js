import React from 'react';
import * as PropTypes from "prop-types";
import { injectIntl } from 'react-intl';
import Link from 'gatsby-link';

const ButtonStep = ({ stepFn, children }) =>
  <button onClick={stepFn}
    className="btn btn-steps btn-block btn-centered">
    {children}
  </button>

export default ButtonStep;
