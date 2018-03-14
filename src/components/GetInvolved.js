import React from 'react'
import Link from 'gatsby-link'
import { FormattedMessage as Trans } from 'react-intl';
import { FacebookButton, TwitterButton, EmailButton } from 'react-social';

import '../styles/GetInvolved.scss';

import fbIcon from '../assets/img/fb.svg';
import twitterIcon from '../assets/img/twitter.svg';

const GetInvolved = (props) => (
  <div className="GetInvolved">
    <h3 className="text-center">Get involved with the Right to Counsel movement!</h3>
    <div className="container grid-lg">
      <div className="columns">
        <div className="column col-md-12 col-6">
          <div className="form-group">
            <label className="form-label" htmlFor="input-example-1">Share this page with a neighbor:</label>
            <div className="btn-group btns-social btn-group-block">
              <FacebookButton className="btn btn-steps"
                sharer={true}
                appId={`1023402221142410`}
                windowOptions={['width=400', 'height=200']}>
                <img src={fbIcon} className="icon mx-1" alt="Facebook" />
                Facebook
              </FacebookButton>
              <TwitterButton className="btn btn-steps"
                message="If you're being evicted, we can help. Go to Eviction Free NYC today! @RTCNYC @JustFixNYC"
                windowOptions={['width=400', 'height=200']}>
                <img src={twitterIcon} className="icon mx-1" alt="Twitter" />
                Twitter
              </TwitterButton>
              <EmailButton target="_blank"
                className="btn btn-steps">
                <i className="icon icon-mail mx-2" />
                Email
              </EmailButton>
            </div>
          </div>
        </div>
        <div className="column col-md-12 col-3">
          <div className="form-group">
            <label className="form-label" htmlFor="input-example-1">Receive email updates:</label>


            {/* <!-- www.123formbuilder.com script begins here --> */}
            {/* <iframe allowTransparency="true" style={{minHeight:"300px", height:"inherit", overflow:"auto"}} width="100%" src="http://www.123formbuilder.com/my-contact-form-3538714.html">
            <p>Your browser does not support iframes. The contact form cannot be displayed. Please use another contact method (phone, fax etc)</p>
            </iframe> */}


{/*
            <script type="text/javascript" defer src="//www.123formbuilder.com/embed/3538714.js" data-role="form" data-default-width="650px"></script> */}

            <a href="https://www.righttocounselnyc.org/join" target="_blank"
              className="btn btn-primary btn-block">
              Register with Email
            </a>


            {/* <div className="input-group">
              <input type="text" className="form-input" placeholder="Enter your email" />
              <button className="btn btn-primary input-group-btn">Submit</button>
            </div> */}
          </div>
        </div>
        <div className="column col-md-12 col-3">
          <div className="form-group">
            <label className="form-label" htmlFor="input-example-1">Attend upcoming events:</label>
            <a href="https://www.righttocounselnyc.org/upcoming_events" target="_blank"
              className="btn btn-primary btn-block">
              Find an event
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default GetInvolved;
