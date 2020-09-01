import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import { FormattedMessage } from "react-intl";

const SelectLanguage = ({ langs }) => {
  const links = langs.map((lang) => (
    <Link
      key={lang.langKey}
      to={lang.link}
      className={`btn btn-sm ${lang.selected ? "btn-steps" : "btn-default"}`}
    >
      <FormattedMessage id={lang.langKey} />
    </Link>
  ));

  return (
    <div className="SelectLanguage">
      <ul className="list-inline btn-group">
        {/* <li><FormattedMessage id="selectLanguage" /></li> */}
        {links}
      </ul>
    </div>
  );
};

SelectLanguage.propTypes = {
  langs: PropTypes.array,
};

export default SelectLanguage;
