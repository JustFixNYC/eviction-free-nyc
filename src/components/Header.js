import React from 'react'
import Link from 'gatsby-link'
import SelectLanguage from './SelectLanguage';

import '../styles/Header.scss';

const Header = (props) => (
  <header className="Header navbar">
    <section className="navbar-section">
      <Link className="navbar-brand" to="/">Eviction Free NYC!</Link>
    </section>
    <section className="navbar-section">
      <SelectLanguage langs={props.langs} />
    </section>
  </header>
)

export default Header;
