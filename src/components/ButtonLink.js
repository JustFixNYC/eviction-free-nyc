import React from 'react';
import * as PropTypes from "prop-types";
import Link from 'gatsby-link';

const propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
}

const ButtonLink = ({ type, size, to, children }) => {

  let className = 'btn';
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
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

ButtonLink.propTypes = propTypes;

export default ButtonLink;
