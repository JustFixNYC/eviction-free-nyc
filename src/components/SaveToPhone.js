import React from 'react';
import Select from 'react-select';
import APIClient from './APIClient';
import { FormattedMessage as Trans } from 'react-intl';

// Wrap the require in check for window
if (typeof document !== `undefined`) {
  const ReactPhoneInput = require("react-phone-input");
  // import ReactPhoneInput from 'react-phone-input';
}


import '../styles/SaveToPhone.scss';

class SaveToPhone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      button: 'init',
      error: null,
      phone: '',
    }
  }

  handleOnChange = (value) => {
    this.setState({ phone: value });
  }

  handleOnSubmit = () => {

    let page;
    if (typeof window !== `undefined`) {
      page = window.location.href;
    }
    const message = `Eviction Free NYC!

Follow this link for assistance in your eviction case: ${page}
    `;

    this.setState({ button: 'loading' });

    APIClient.sendSMS(this.state.phone, message).then(res => {
      if(res.statusCode >= 400) {
        this.setState({
          button: 'error',
          error: res.body.message
        });
      } else {
        this.setState({
          button: 'success',
          error: null
        });
      }
    });
  }

  render() {

    let button;
    switch(this.state.button) {
      case 'init':
        button = <button className="btn btn-steps input-group-btn" onClick={this.handleOnSubmit}><Trans id="submit" /></button>
        break;
      case 'loading':
        button = <button className="btn btn-steps loading input-group-btn"><Trans id="submit" /></button>
        break;
      case 'success':
        button = <button className="btn btn-success input-group-btn"><Trans id="success" /></button>
        break;
      case 'error':
        button = <button className="btn btn-steps input-group-btn" onClick={this.handleOnSubmit}><Trans id="tryAgain" /></button>
        break;
      default:
        button = <button className="btn btn-steps input-group-btn" onClick={this.handleOnSubmit}><Trans id="submit" /></button>
        break;
    }

    return (
      <div className="SaveToPhone">
        <div className="container grid-lg">
          <div className="columns">
            <div className="column col-md-12 col-6">
              <h5><i className="icon icon-bookmark"></i> <Trans id="saveToPhoneTitle" /></h5>
              <p><Trans id="saveToPhoneSubtitle" /></p>
            </div>
            <div className="column col-md-12 col-6">
              <div className="input-group">
                <ReactPhoneInput className="input-group" defaultCountry={'us'} value={this.state.phone} onChange={this.handleOnChange} />
                {button}
              </div>
              {this.state.error ? (
                <p className="mt-2 text-bold text-error "><sup>{this.state.error}</sup></p>
              ) : (
                <p className="mt-2"><sup><i><Trans id="saveToPhoneInfo" /></i></sup></p>
              )}
            </div>
          </div>
        </div>


      </div>

    );
  }


}

export default SaveToPhone;
