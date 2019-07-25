import React from "react";
import Helmet from 'react-helmet';
import * as PropTypes from "prop-types";
import { injectIntl, FormattedMessage as Trans } from 'react-intl';
import {
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import { addCallButtons } from '../utils/text';
import { getParameterByName } from '../utils/browser';

import Accordion from "../components/Accordion";
import SaveToPhone from "../components/SaveToPhone";
import ProvidersCarousel from "../components/ProvidersCarousel";
import CommunityGroups from "../components/CommunityGroups";

import '../styles/HousingCourtPage.scss';

const CourtPage = ({ qualifiedType, steps, additionalResources, providers, intl }) => {

  
  const userZip = getParameterByName('zip');

  return (
    <section className="Page HousingCourtPage container grid-md">

      <Helmet>
        <meta name="description" content="This guide will help you respond to your eviction notice and connect with legal resources. Eviction Free NYC!" />
        <meta property="og:description" content="This guide will help you respond to your eviction notice and connect with legal resources. Eviction Free NYC!" />
        <meta name="twitter:description" content="This guide will help you respond to your eviction notice and connect with legal resources. Eviction Free NYC!" />
      </Helmet>

      <div className="HousingCourtPage_Header clearfix">
        <h2 className="float-left">
        {
          {
            'qualified': <Trans id={'qualifiedTitle'}/>,
            'notQualified': <Trans id={'notQualifiedTitle'}/>,
            'qualifiedAdmin': <Trans id={'titleOverride'}/>
          }[qualifiedType]
        }
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
          <Accordion content={additionalResources} multiple>
            <AccordionItem key={additionalResources.length}>
              <AccordionItemTitle className="clearfix">
                <span className="Accordion__title float-left">
                  <h5><Trans id="groupsTitle" /></h5>
                </span>
                <i className="icon icon-plus float-right ml-2 mt-1"></i>
                <i className="icon icon-minus float-right ml-2 mt-1"></i>
              </AccordionItemTitle>
              <AccordionItemBody  className="accordion__body accordion__body--groups">
                <CommunityGroups zip={userZip} />
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      <SaveToPhone />
    </section>
  );
}

export default CourtPage;

// keeping graphql in template pages
