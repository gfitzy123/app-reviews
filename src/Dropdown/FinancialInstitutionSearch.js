import faker from "faker";
import _ from "lodash";
import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

const financialInstitutionOptions = [
  {
    key: "Webster Bank",
    text: "Webster Bank",
    value: "Webster Bank",
    image: { avatar: true, src: "webster_bank.jpeg" },
  },
];

export default class FinancialInstitutionSearch extends Component {
  state = { searchQuery: "" };

  handleChange = (e, { searchQuery, value }) =>
    this.setState({ searchQuery, value });

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  render() {
    const { searchQuery, value } = this.state;

    return (
      <Dropdown
        className="fi-dropdown"
        fluid
        multiple
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        options={financialInstitutionOptions}
        placeholder="Financial Institution"
        search
        searchQuery={searchQuery}
        selection
        value={value}
      />
    );
  }
}
