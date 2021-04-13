import React from "react";
import { Container, Grid, Button, Dropdown } from "semantic-ui-react";

const FilterBySentiment = (props) => (
  <Container className="filter-by-sentiment">
    <Grid>
      <Grid.Row>
        <Dropdown text="Filter By Sentiment"></Dropdown>
      </Grid.Row>
      <Grid.Row>
        <Button
          className="SuperHappy"
          onClick={props.filterBySentiment}
          active={props.selectedSentiments[4] !== undefined}
        >
          😃 Super Happy
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Button
          className="Happy"
          onClick={props.filterBySentiment}
          active={props.selectedSentiments[3] !== undefined}
        >
          🙂 Happy
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Button
          className="Meh"
          onClick={props.filterBySentiment}
          active={props.selectedSentiments[2] !== undefined}
        >
          🤨 Meh
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Button
          className="Disappointed"
          onClick={props.filterBySentiment}
          active={props.selectedSentiments[1] !== undefined}
        >
          🙁 Disappointed
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Button
          className="Angry"
          onClick={props.filterBySentiment}
          active={props.selectedSentiments[0] !== undefined}
        >
          😡 Angry
        </Button>
      </Grid.Row>
    </Grid>
  </Container>
);

export default FilterBySentiment;
