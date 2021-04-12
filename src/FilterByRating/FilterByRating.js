import React from "react";
import {
  Image,
  Card,
  List,
  Icon,
  Container,
  Grid,
  GridRow,
  Button,
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
        <Button className="starButton">
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Button className="starButton">
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="grey" name="star" />
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Button className="starButton">
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="grey" name="star" />
          <Icon color="grey" name="star" />
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Button className="starButton">
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="grey" name="star" />
          <Icon color="grey" name="star" />
          <Icon color="grey" name="star" />
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Button className="starButton">
          <Icon color="yellow" name="star" />
          <Icon color="grey" name="star" />
          <Icon color="grey" name="star" />
          <Icon color="grey" name="star" />
          <Icon color="grey" name="star" />
        </Button>
      </Grid.Row>
    </Grid>
  </Container>
);

export default FilterByRating;
