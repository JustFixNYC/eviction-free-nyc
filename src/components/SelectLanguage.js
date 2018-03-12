import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { FormattedMessage } from 'react-intl';

const SelectLanguage = ({ langs }) => {

  const links = langs.map(lang =>
    <li key={lang.langKey} selected={lang.selected}>
      <Link to={lang.link} className={lang.selected ? 'selected' : ''}>
          <FormattedMessage id={lang.langKey} />
      </Link>
    </li>
  );

  return (
    <div className="SelectLanguage">
      <ul className="list-inline">
        {/* <li><FormattedMessage id="selectLanguage" /></li> */}
        {links}
      </ul>
    </div>
  );
};

SelectLanguage.propTypes = {
  langs: PropTypes.array
};

export default SelectLanguage;
