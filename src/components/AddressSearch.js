import React from "react";
import Geosuggest from "react-geosuggest";
import { FormattedMessage as Trans } from "react-intl";

import "../styles/AddressSearch.scss";

class AddressSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };

    this.geosuggestBounds = null;
    if (typeof window !== `undefined`) {
      this.geosuggestBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(40.477398, -74.259087),
        new window.google.maps.LatLng(40.917576, -73.700172)
      );
    }
  }

  handleGeosuggest = (suggest) => {
    if (suggest && suggest.gmaps) {
      const components = suggest.gmaps.address_components;
      let zip = components.filter(
        (e) => e.types.indexOf("postal_code") !== -1
      )[0];
      if (zip) {
        zip = zip.long_name;
      } else {
        Rollbar.error("Missing zipcode", components);
        this.setState({ error: true });
      }

      let boro = components.filter(
        (e) => e.types.indexOf("sublocality_level_1") !== -1
      )[0];
      if (boro) {
        boro = boro.long_name.toUpperCase();
        this.setState({ error: false });
        this.props.onFormSubmit({ zip, boro });
        this.props.showNextBtn();
      } else if (
        ["MANHATTAN", "STATEN ISLAND", "BROOKLYN", "QUEENS", "BRONX"].indexOf(
          boro
        ) === -1
      ) {
        Rollbar.error("Address / borough mismatch", components);
        this.setState({ error: true });
      } else {
        Rollbar.error("No borough found", components);
        this.setState({ error: true });
      }
    }
  };

  render() {
    return (
      <div className="AddressSearch">
        <Geosuggest
          bounds={this.geosuggestBounds}
          onSuggestSelect={this.handleGeosuggest}
          inputClassName={`form-input input-lg ${
            this.state.error ? "is-error" : ""
          }`}
          placeholder={this.props.placeholder}
        />
        {this.state.error && (
          <p className="mt-2 text-bold text-error">
            <Trans id="addrError" />
          </p>
        )}
      </div>
    );
  }
}

export default AddressSearch;
