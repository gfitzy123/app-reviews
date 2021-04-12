import React from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Segment,
  Step,
  Table,
  Dropdown,
} from "semantic-ui-react";
import FinancialInstitutionSearch from "./Dropdown/FinancialInstitutionSearch";
import ReviewList from "./ReviewList/ReviewList";
import FilterByRating from "./FilterByRating/FilterByRating";

const style = {
  h1: {
    marginTop: "3em",
  },
  h2: {
    margin: "4em 0em 2em",
  },
  h3: {
    marginTop: "2em",
    padding: "2em 0em",
  },
  last: {
    marginBottom: "300px",
  },
};

const sortOptions = [
  {
    key: "Newest First",
    text: "Newest First",
    value: "Newest First",
    //   image: { avatar: true, src: "./webster_bank.jpeg" },
  },
];

const translationOptions = [
  {
    key: "English",
    text: "English",
    value: "English",
    // image: { avatar: true, src: "./webster_bank.jpeg" },
  },
];

const reviews = [];

class ResponsiveLayout extends React.Component {
  render() {
    return (
      <div>
        <Header
          as="h1"
          content="KOOZIES 4 LIFE"
          style={style.h1}
          textAlign="center"
        />
        <Grid padded={true} columns={5} stackable>
          <Grid.Column padded={true}>
            <FinancialInstitutionSearch />
          </Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>

          <Grid.Column>
            <Dropdown
              placeholder="Newest First"
              fluid
              selection
              options={sortOptions}
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              placeholder="English"
              fluid
              selection
              options={translationOptions}
            />
          </Grid.Column>
          <Grid.Row padded={true} columns={2}>
            <Grid.Column width={4}>
              <FilterByRating />
            </Grid.Column>
            <Grid.Column width={10}>
              <ReviewList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default ResponsiveLayout;
