import React from "react";
import Select from "react-select";

import "react-select/dist/react-select.css";

import NychaData from "../data/nycha.json";

class NychaSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    if (selectedOption) this.props.onFormSubmit(selectedOption);
  };

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
        // className="label-lg"
      />
    );
  }
}

export default NychaSearch;
