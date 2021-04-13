import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import webBank from "./webster_bank.jpg";


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
    image: { avatar: true, src: webBank },
  },
  {
    key: 'DH25924',
    text: 'DH25924',
    value: {
      name: 'DH25924',
      appleId: 1440599657
    }
  },
  {
    key: 'DH25924biz',
    text: 'DH25924biz',
    value: {
      name: 'DH25924biz',
      appleId: 1440601027
    }
  },
  {
    key: 'CAT62452',
    text: 'CAT62452',
    value: {
      name: 'CAT62452',
      appleId: 898425587
    }
  },
  {
    key: 'BTBB7343',
    text: 'BTBB7343',
    value: {
      name: 'BTBB7343',
      appleId: 912099688
    }
  },
  {
    key: 'DH11803biz',
    text: 'DH11803biz',
    value: {
      name: 'DH11803biz',
      appleId: 1492373642
    }
  },
  {
    key: 'downey',
    text: 'downey',
    value: {
      name: 'downey',
      appleId: 1220572008
    }
  },
  {
    key: 'DH21373',
    text: 'DH21373',
    value: {
      name: 'DH21373',
      appleId: 1141918706
    }
  },
  {
    key: 'DH21326',
    text: 'DH21326',
    value: {
      name: 'DH21326',
      appleId: 1181142880
    }
  },
  {
    key: 'DH10543',
    text: 'DH10543',
    value: {
      name: 'DH10543',
      appleId: 1071451651
    }
  }
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
        className="fi-dropdown"
        fluid
        multiple
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        options={financialInstitutionOptions}
        defaultValue="Webster Bank"
        search
        searchQuery={searchQuery}
        selection
      />
    );
  }
}
