import React from "react";
import * as PropTypes from "prop-types";
import { injectIntl, FormattedMessage as Trans } from 'react-intl';
import { addCallButtons } from '../utils/text';




import Accordion from "../components/Accordion";
import SaveToPhone from "../components/SaveToPhone";
import ProvidersCarousel from "../components/ProvidersCarousel";

import '../styles/HousingCourtPage.scss';

// const propTypes = {
//   qualified: PropTypes.object.isRequired,
// }

const CourtPage = ({ qualified, steps, additionalResources, providers }) => {

  return (
    <section className="Page HousingCourtPage container grid-md">
      <div className="HousingCourtPage_Header clearfix">
        <h2 className="float-left">
          <Trans id={qualified ? 'qualifiedTitle' : 'notQualifiedTitle'} />
        </h2>
        <button onClick={() => window.print()}
          className="btn btn-default float-right"><Trans id="print" /></button>
      </div>

      {/* <SaveToPhone /> */}

      <h6><Trans id="doNow" /></h6>
      <Accordion content={steps} multiple />

      <h6>Available Legal Services</h6>
      <ProvidersCarousel providers={providers} />

      {additionalResources && (
        <div>
          <h6><Trans id="additionalResources" /></h6>
          <Accordion content={additionalResources} multiple />
        </div>
      )}

      <SaveToPhone />
    </section>
  );
}



// CourtPage.propTypes = propTypes;

export default CourtPage;

// keeping graphql in template pages
