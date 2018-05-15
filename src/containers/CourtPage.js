import React from "react";
import Helmet from 'react-helmet';
import * as PropTypes from "prop-types";
import { injectIntl, FormattedMessage as Trans } from 'react-intl';
import { addCallButtons } from '../utils/text';
import { getParameterByName } from '../utils/browser';

import Accordion from "../components/Accordion";
import SaveToPhone from "../components/SaveToPhone";
import ProvidersCarousel from "../components/ProvidersCarousel";
import ContentfulClient from "../components/ContentfulClient";

import '../styles/HousingCourtPage.scss';

// const propTypes = {
//   qualified: PropTypes.object.isRequired,
// }

const CourtPage = ({ qualified, steps, additionalResources, providers, intl }) => {

  const userZip = getParameterByName('zip');

  ContentfulClient.fetchCommunityGroups(userZip, intl.locale)
    .then((response) => console.log(response.items))
    .catch(console.error);

  return (
    <section className="Page HousingCourtPage container grid-md">

      <Helmet>
        <meta name="description" content="This guide will help you respond to your eviction notice and connect with legal resources. Eviction Free NYC!" />
        <meta property="og:description" content="This guide will help you respond to your eviction notice and connect with legal resources. Eviction Free NYC!" />
        <meta name="twitter:description" content="This guide will help you respond to your eviction notice and connect with legal resources. Eviction Free NYC!" />
      </Helmet>

      <div className="HousingCourtPage_Header clearfix">
        <h2 className="float-left">
          <Trans id={qualified ? 'qualifiedTitle' : 'notQualifiedTitle'} />
        </h2>
        <button onClick={() => window.print()}
          className="btn btn-default float-right"><Trans id="print" /></button>
      </div>

      {/* <SaveToPhone /> */}

      <h6><Trans id="doNow" /></h6>
      <Accordion content={steps} multiple steps />

      {providers && (
        <div>
          <h6><Trans id="connectLSP" /></h6>
          <ProvidersCarousel providers={providers} />
        </div>
      )}


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
