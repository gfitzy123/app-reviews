import React from "react";
import { Icon, Container, Grid, Button, Dropdown } from "semantic-ui-react";
import ReviewCard from "../ReviewCard/ReviewCard";

const FilterByRating = (props) => (
  <Container className="filter-by-rating">
    <Grid>
      <Grid.Row>
        <Dropdown text="Filter By Rating"></Dropdown>
      </Grid.Row>
      <Grid.Row>
        <Button
          className="5starButton"
          onClick={props.filterByRating}
          active={props.selectedRatings.indexOf(5) > -1 ? true : false}
        >
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Button
          className="4starButton"
          onClick={props.filterByRating}
          active={props.selectedRatings.indexOf(4) > -1 ? true : false}
        >
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="grey" name="star" />
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Button
          className="3starButton"
          onClick={props.filterByRating}
          active={props.selectedRatings.indexOf(3) > -1 ? true : false}
        >
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="grey" name="star" />
          <Icon color="grey" name="star" />
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Button
          className="2starButton"
          onClick={props.filterByRating}
          active={props.selectedRatings.indexOf(2) > -1 ? true : false}
        >
          <Icon color="yellow" name="star" />
          <Icon color="yellow" name="star" />
          <Icon color="grey" name="star" />
          <Icon color="grey" name="star" />
          <Icon color="grey" name="star" />
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Button
          className="1starButton"
          onClick={props.filterByRating}
          active={props.selectedRatings.indexOf(1) > -1 ? true : false}
        >
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
