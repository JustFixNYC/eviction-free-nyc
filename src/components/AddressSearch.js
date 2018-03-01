import React from 'react';
import Geosuggest from 'react-geosuggest';

import '../styles/AddressSearch.scss';

const AddressSearch = (props) => {

  const geosuggestBounds = new window.google.maps.LatLngBounds(
    new window.google.maps.LatLng(40.477398, -74.259087),
    new window.google.maps.LatLng(40.917576, -73.700172)
  );

  const handleGeosuggest = (suggest) => {

    if(suggest && suggest.gmaps) {
      const components = suggest.gmaps.address_components;
      const zip = components.filter(e => e.types.indexOf('postal_code') !== -1)[0].long_name;

      let boro = components.filter(e => e.types.indexOf('sublocality_level_1') !== -1)[0];
      if(boro) boro = boro.long_name.toUpperCase();
      else {
        console.error('No borough found!!');
      }

      props.onFormSubmit({ zip, boro });
    }
  }

  return (
    <div className="AddressSearch">
      <Geosuggest
        bounds={geosuggestBounds}
        onSuggestSelect={handleGeosuggest}
        inputClassName="form-input"
        placeholder={props.placeholder}
        />
    </div>
  );
}

export default AddressSearch;
