import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { FormattedMessage } from 'react-intl';

const SelectLanguage = (props) => {
  const links = props.langs.map(lang =>
    <li key={lang.langKey} selected={lang.selected}>
      <Link to={lang.link}>    
          {lang.langKey}
      </Link>
    </li>
  );

  return (
    <section>
      <ul className="list-inline">
        {/* <li><FormattedMessage id="selectLanguage" /></li> */}
        {links}
      </ul>
    </section>
  );
};

SelectLanguage.propTypes = {
  langs: PropTypes.array
};

export default SelectLanguage;
