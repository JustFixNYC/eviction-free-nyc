import React from 'react';
import * as PropTypes from "prop-types";
import { injectIntl } from 'react-intl';
import Link from 'gatsby-link';

const propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
}

const ButtonLink = ({ type, size, to, children, intl }) => {

  const slug = `/${intl.locale}${to}`;

  let className = 'btn btn-block btn-centered';
  switch(type) {
    case 'primary':
      className += ' btn-primary';
      break;
    case 'link':
      className += ' btn-link';
      break;
    default:
      break;
  }

  switch(size) {
    case 'large':
      className += ' btn-lg';
      break;
    default:
      break;
  }


  return (
    <Link to={slug} className={className}>
      {children}
    </Link>
  );
}

ButtonLink.propTypes = propTypes;

export default injectIntl(ButtonLink);
