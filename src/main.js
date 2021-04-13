import React from "react";
import {
  Grid,
  Header,
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
  state = {
    selectedApps: [],
    reviews: []
  }

  setSelectedApps = (value) => {
    this.setState({
      selectedApps: [...value]
    });
  }

  fetchReviews = async () => {
      const promises = this.state.selectedApps.map(async (selection) => {
        const res = await fetch(`https://itunes.apple.com/US/rss/customerreviews/id=${selection.appleId}/json`)
        return await res.json();
      });
      const results = await Promise.all(promises);
      this.setState({ reviews: [...results] })
  }

  async componentDidUpdate(_, prevState) {
    if (prevState.selectedApps !== this.state.selectedApps) {
      await this.fetchReviews();
    }
  }

  render() {
    console.log(this.state)
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
            <FinancialInstitutionSearch selectedApps={this.state.selectedApps} setSelectedApps={this.setSelectedApps}/>
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
