import React from "react";
import {
  Image,
  Card,
  List,
  Icon,
  Container,
  Grid,
  GridRow,
  Dropdown,
} from "semantic-ui-react";
import ReviewCard from "../ReviewCard/ReviewCard";

const FilterByRating = () => (
  <Container className="filter-by-rating">
    <Grid>
      <Grid.Row>
        <Dropdown text="Filter By Rating"></Dropdown>
      </Grid.Row>
      <Grid.Row>
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
      </Grid.Row>
      <Grid.Row>
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="grey" />
      </Grid.Row>
      <Grid.Row>
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="gray" />
        <Icon color="yellow" name="grey" />
      </Grid.Row>
      <Grid.Row>
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="grey" />
        <Icon color="yellow" name="grey" />
        <Icon color="yellow" name="grey" />
      </Grid.Row>
      <Grid.Row>
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="grey" />
        <Icon color="yellow" name="grey" />
        <Icon color="yellow" name="grey" />
        <Icon color="yellow" name="grey" />
      </Grid.Row>
    </Grid>
  </Container>
);

export default FilterByRating;
