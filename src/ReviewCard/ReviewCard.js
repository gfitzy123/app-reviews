import React from "react";
import { Card } from "semantic-ui-react";
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

const ReviewCard = (review) => {
  const starCount = parseInt(review.review["im:rating"].label);
  const stars = Array(starCount)
    .fill(0)
    .map((_, i) => i * i)
    .map((star) => <Icon color="yellow" name="star" />);
  return (
    <div>
      <Card.Content>
        <Card.Header>
          <Button floated="left" disabled={true}>
            iOS
          </Button>

          {review.review.title.label}
          {stars}
        </Card.Header>
        <Card.Meta>
          <span className="date"></span>
        </Card.Meta>
        <Card.Description>{review.review.content.label}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {" "}
        <strong> by {review.review.author.name.label} </strong>
      </Card.Content>
    </div>
  );
};

export default ReviewCard;
