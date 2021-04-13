import React from "react";
import { Grid, Header, List, Card, Dropdown, Input } from "semantic-ui-react";
import FinancialInstitutionSearch from "./Dropdown/FinancialInstitutionSearch";
import FilterByRating from "./FilterByRating/FilterByRating";
import FilterBySentiment from "./FilterBySentiment/FilterBySentiment";
import ReviewCard from "./ReviewCard/ReviewCard";
import { flatten, compact, orderBy } from "lodash";
import Fuse from "fuse.js";

const Analyzer = require('natural').SentimentAnalyzer;
const stemmer = require('natural').PorterStemmer;
const analyzer = new Analyzer('English', stemmer, 'afinn');

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
  {
    key: "Rating",
    text: "Rating",
    value: "Rating",
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

const keys = {
  TITLE: "title.label",
  COMMENT: "im:rating.label",
  AUTHOR: "author.name.label",
};
const { TITLE, COMMENT, AUTHOR } = keys;

const fuseOptions = {
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  distance: 50,
  maxPatternLength: 12,
  minMatchCharLength: 3,
  keys: [TITLE, COMMENT, AUTHOR],
};

class ResponsiveLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedApps: [],
      reviews: [],
      query: "",
      ratingsSelected: [],
      sentimentsSelected: [],
    };

    this.onChange = this.onChange.bind(this);
  }

  setSelectedApps = (value) => {
    this.setState({
      selectedApps: [...value],
    });
  };

  onChange(e) {
    const { target = {} } = e;
    const { value = "" } = target;
    this.setState({ query: value });
  }

  getSentiments = (reviews) => {
    try {
      return reviews.map((review) => {
        return { ...review, sentiment: analyzer.getSentiment((review?.title?.label || '').concat(` ${review?.content?.label || ''}`).split(' ')) };
      });
    } catch (err) {
      console.error(err);
    }
  };

  fetchReviews = async () => {
    const promises = this.state.selectedApps.map(async (selection) => {
      const res = await fetch(
        `https://itunes.apple.com/US/rss/customerreviews/id=${selection.appleId}/json`
      );
      return await res.json();
    });
    const results = await Promise.all(promises);
    const entries = results.map((financialInstitution) => {
      return financialInstitution.feed.entry;
    });
    const reviews = this.getSentiments(flatten(entries));
    this.setState({ reviews });
    return reviews;
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.selectedApps !== this.state.selectedApps) {
      await this.fetchReviews();
    }
  }

  filterByRatingHandler = async (e, v) => {
    const buttonName = v.className;
    let starRating = 0;

    switch (buttonName) {
      case "5starButton":
        starRating = 5;
        break;
      case "4starButton":
        starRating = 4;
        break;
      case "3starButton":
        starRating = 3;
        break;
      case "2starButton":
        starRating = 2;
        break;
      case "1starButton":
        starRating = 1;
        break;
      default:
        starRating = 5;
    }

    let currentlySelectedRatings = this.state.ratingsSelected;

    if (currentlySelectedRatings.indexOf(starRating) === -1) {
      currentlySelectedRatings[starRating - 1] = starRating;
    } else {
      currentlySelectedRatings.splice(starRating - 1, starRating);
    }

    if (compact(currentlySelectedRatings).length === 0) {
      this.fetchReviews();
      return;
    }

    const allReviews = await this.fetchReviews();
    let reviews = [];

    for (let i = currentlySelectedRatings.length; i >= 0; i--) {
      const filteredReviews = allReviews.filter((review) => {
        return (
          parseInt(review["im:rating"].label) === currentlySelectedRatings[i]
        );
      });

      reviews = reviews.concat(filteredReviews);
    }

    this.setState({ reviews, selectedRatings: currentlySelectedRatings });
  };

  sortChangeHandler = (e, v) => {
    if (v.value === "Rating") {
      const orderedReviews = orderBy(
        this.state.reviews,
        [`im:rating[label]`],
        ["desc"]
      );
      this.setState({ reviews: orderedReviews });
    } else {
      this.fetchReviews();
    }
  };

  filterBySentimentHandler = async (e, v) => {
    const buttonName = v.className;
    let happyRating = [-5,5];
    let happyIndex = 0;

    switch (buttonName) {
      case "SuperHappy":
        happyRating = [.4,5.1];
        happyIndex = 5;
        break;
      case "Happy":
        happyRating = [.1,.4];
        happyIndex = 4;
        break;
      case "Meh":
        happyRating = [0,.1];
        happyIndex = 3;
        break;
      case "Disappointed":
        happyRating = [-.16,0];
        happyIndex = 2;
        break;
      case "Angry":
        happyRating = [-5,-.16];
        happyIndex = 1;
        break;
      default:
        happyRating = [-5,5.1];
        happyIndex = 5;
    }

    let currentlySelectedSentiments = this.state.sentimentsSelected;

    if (currentlySelectedSentiments[happyIndex - 1] === undefined) {
      currentlySelectedSentiments[happyIndex - 1] = happyRating;
    } else {
      currentlySelectedSentiments[happyIndex - 1] = undefined;
    }

    if (compact(currentlySelectedSentiments).length === 0) {
      this.fetchReviews();
      return;
    }

    const allReviews = await this.fetchReviews();

    
    const filteredReviews = allReviews.filter((review) => {
      const sentNumber = review['sentiment'];
      let include = false;
      for (let i = currentlySelectedSentiments.length - 1; i >= 0; i--) {
        if (currentlySelectedSentiments[i] !== undefined) {
          if (sentNumber >= currentlySelectedSentiments[i][0] && sentNumber < currentlySelectedSentiments[i][1]) {
            include = true;
          }
        }
      }
      return include;
    });

    this.setState({ reviews: filteredReviews, selectedSentiments: currentlySelectedSentiments });
  };

  render() {
    const { reviews = [], query = "" } = this.state;
    const fuse = new Fuse(reviews, fuseOptions);
    const data = query ? fuse.search(query) : reviews;
    const reviewsJsx = data.map((x, i) => {
      const uuid = `${i}-${x?.id?.label}-${Math.floor(Math.random() * 1000)}`;
      return <ReviewCard key={uuid} review={x} />;
    });
    return (
      <div>
        <Header
          as="h1"
          content="KOOZIES 4 LIFE"
          style={style.h1}
          textAlign="center"
        />

        <Grid columns={5} stackable>
          <Grid.Column>
            <FinancialInstitutionSearch
              selectedApps={this.state.selectedApps}
              setSelectedApps={this.setSelectedApps}
            />
          </Grid.Column>
          <Grid.Column>
            <Input
              placeholder="Search for comments.."
              onChange={this.onChange}
            />
          </Grid.Column>
          <Grid.Column></Grid.Column>

          <Grid.Column>
            <Dropdown
              defaultValue="Newest First"
              fluid
              selection
              options={sortOptions}
              onChange={this.sortChangeHandler}
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
              <FilterByRating
                filterByRating={this.filterByRatingHandler}
                selectedRatings={this.state.ratingsSelected}
              />
              <FilterBySentiment
                filterBySentiment={this.filterBySentimentHandler}
                selectedSentiments={this.state.sentimentsSelected}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <List divided relaxed="very">
                <List.Item>
                  <Card.Group>{reviewsJsx}</Card.Group>
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
