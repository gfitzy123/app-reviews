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
  List,
  Card,
  Dropdown,
} from "semantic-ui-react";
import FinancialInstitutionSearch from "./Dropdown/FinancialInstitutionSearch";
import FilterByRating from "./FilterByRating/FilterByRating";
import ReviewCard from "./ReviewCard/ReviewCard";
import { reviews } from "./reviews";
import soundfile from "./anteUp.mp3";
import Sound from "react-sound";
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

        <a href="url">
          <strong> https://en.wikipedia.org/wiki/M.O.P. </strong>{" "}
        </a>
        <Sound
          url={soundfile}
          playStatus={Sound.status.PLAYING}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
        <Grid columns={5} stackable>
          <Grid.Column>
            <FinancialInstitutionSearch />
          </Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>

          <Grid.Column>
            <Dropdown
              value="Newest First"
              fluid
              selection
              options={sortOptions}
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              value="English"
              fluid
              selection
              options={translationOptions}
            />
          </Grid.Column>
          <Grid.Row columns={2}>
            <Grid.Column width={4}>
              <FilterByRating />
            </Grid.Column>
            <Grid.Column width={10}>
              <List divided relaxed="very">
                <List.Item>
                  <Card.Group>
                    {reviews.feed.entry.map((review) => {
                      //   console.log(review);
                      return <ReviewCard review={review} />;
                    })}
                  </Card.Group>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default ResponsiveLayout;
