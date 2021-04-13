import React from "react";
import { Grid, Header, List, Card, Dropdown, Input } from "semantic-ui-react";
import FinancialInstitutionSearch from "./Dropdown/FinancialInstitutionSearch";
import FilterByRating from "./FilterByRating/FilterByRating";
import ReviewCard from "./ReviewCard/ReviewCard";
import { flatten, compact, orderBy } from "lodash";
import Fuse from "fuse.js";
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
    const reviews = flatten(entries);
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
      let arrayPosition = starRating - 1;
      currentlySelectedRatings[starRating - 1] = starRating;
    } else {
      currentlySelectedRatings.splice(starRating - 1, starRating);
    }

    if (compact(currentlySelectedRatings).length === 0) {
      this.fetchReviews();
      return;
    }

    let allReviews = await this.fetchReviews();
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
      {
      }
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

  render() {
    const { reviews = [], query = "" } = this.state;
    const fuse = new Fuse(reviews, fuseOptions);
    const data = query ? fuse.search(query) : reviews;
    const reviewsJsx = data.map((x, i) => <ReviewCard key={i} review={x} />);
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
