import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";


//need the appleId and playId of the selected institution
const financialInstitutionOptions = [
  {
    key: "Webster Bank",
    text: "Webster Bank",
    value: {
      name: "Webster Bank",
      appleId: 1321994487,
      playId: 'com.malauzai.websterbank'
    },
    image: { avatar: true, src: "webster_bank.jpeg" },
  },
];

export default class FinancialInstitutionSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: "" };
  }

  handleChange = (e, { searchQuery, value }) => {
    this.props.setSelectedApps(value);
  }

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  render() {
    const { searchQuery } = this.state;

    return (
      <Dropdown
        fluid
        multiple
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        options={financialInstitutionOptions}
        placeholder="Financial Institution"
        search
        searchQuery={searchQuery}
        selection
      />
    );
  }
}
