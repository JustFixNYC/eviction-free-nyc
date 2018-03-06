import React from 'react';
import Select from 'react-select';
import { FormattedMessage as Trans } from 'react-intl';

import 'react-select/dist/react-select.css';

import NychaData from '../data/nycha.json';

class NychaSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    }

    console.log(NychaData);

  }


  handleChange = (selectedOption) => {

    console.log(selectedOption);
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <Select
        name="NychaSearch"
        value={value}
        onChange={this.handleChange}
        placeholder={this.props.placeholder}
        options={NychaData}
      />
    );
  }


}

export default NychaSearch;
