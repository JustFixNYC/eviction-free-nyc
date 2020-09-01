import React from "react";
import * as PropTypes from "prop-types";
import { FormattedMessage as Trans } from "react-intl";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/react-accessible-accordion.css";
import "../styles/Accordion.scss";

const propTypes = {
  content: PropTypes.any.isRequired,
};

const AccordionSection = ({ content, multiple, steps, children }) => {
  const items = content.map((c, i) => (
    <AccordionItem key={i}>
      <AccordionItemTitle className="clearfix">
        <span className="Accordion__title float-left">
          {steps && (
            <h4>
              <Trans id="step" /> {i + 1}
            </h4>
          )}
          <h5>{c.title}</h5>
        </span>
        <i className="icon icon-plus float-right ml-2 mt-1"></i>
        <i className="icon icon-minus float-right ml-2 mt-1"></i>
      </AccordionItemTitle>
      <AccordionItemBody>
        <div
          dangerouslySetInnerHTML={{
            __html: c.html,
          }}
        ></div>
      </AccordionItemBody>
    </AccordionItem>
  ));

  return (
    <Accordion className="Accordion" accordion={!multiple}>
      {/* this assumes a single child, i think */}
      {children}
      {items}
    </Accordion>
  );
};

AccordionSection.propTypes = propTypes;

export default AccordionSection;
