import React from "react";
import * as PropTypes from "prop-types";
import { injectIntl, FormattedMessage as Trans } from 'react-intl';
import { addCallButtons } from '../utils/text';

import Accordion from "../components/Accordion";

import '../styles/HousingCourtPage.scss';

// const propTypes = {
//   qualified: PropTypes.object.isRequired,
// }

const CourtPage = ({ qualified, steps, additionalResources }) =>
  <section className="Page HousingCourtPage container grid-md">
    <div className="HousingCourtPage_Header clearfix">
      <h3 className="float-left">
        <Trans id={qualified ? 'qualifiedTitle' : 'notQualifiedTitle'} />
      </h3>
      <button onClick={() => window.print()}
        className="btn btn-default float-right"><Trans id="print" /></button>
    </div>

    <h6><Trans id="doNow" /></h6>
    <Accordion content={steps} multiple />
    {additionalResources && (
      <div>
        <h6><Trans id="additionalResources" /></h6>
        <Accordion content={additionalResources} multiple />
      </div>
    )}
  </section>


// CourtPage.propTypes = propTypes;

export default CourtPage;

// keeping graphql in template pages
