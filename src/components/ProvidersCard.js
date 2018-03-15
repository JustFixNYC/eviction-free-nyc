import React from 'react';
import Img from "gatsby-image";
import { createFormattedTel } from '../utils/text';

import '../styles/ProvidersCard.scss';

const ProvidersCard = ({ provider }) =>
  <div className="ProvidersCard card">
    <div className="card-header">
      <div className="card-image">
        <Img
          alt="Provider logo"
          sizes={provider.logo.resolutions}
        />
      </div>
      <div className="card-title">
        <h5>{provider.title}</h5>
      </div>

      {/* <div className="card-subtitle text-gray">Software and hardware</div> */}

    </div>

    <div className="card-body">
      {provider.hours && (
        <div className="card-subtitle text-gray">
          <i className="icon icon-time mr-2"></i>
          {provider.hours}
        </div>
      )}
      {provider.address && provider.address.map((addr,i) =>
        <div key={i} className="card-subtitle text-gray">
          <i className="icon icon-location mr-2"></i>
          {addr}
        </div>
      )}
      {provider.intakeInstructions && (
        <p>{provider.intakeInstructions}</p>
      )}
    </div>
    <div className="card-footer">
      <div>
        {provider.phoneNumber && (
          <a href={`tel:${provider.phoneNumber}`}
            className="btn btn-success btn-normal col-mr-auto">
             {createFormattedTel(provider.phoneNumber)}
          </a>
        )}
        {provider.website && (
          <a href={provider.website} target="_blank"
            className="btn btn-link btn-normal col-ml-auto">
            <i className="icon icon-link mr-2"></i>
            Website
          </a>
        )}
      </div>
    </div>
  </div>

export default ProvidersCard;
