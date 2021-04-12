import React from "react";
import { Image, Card, List } from "semantic-ui-react";
import ReviewCard from "../ReviewCard/ReviewCard";

const ReviewList = () => (
  <List relaxed="very">
    <List.Item>
      <Card.Group>
        <ReviewCard />
      </Card.Group>
    </List.Item>
  </List>
);

export default ReviewList;
