import React from "react";
import { Card } from "semantic-ui-react";
import { Button, Icon } from "semantic-ui-react";

const ReviewCard = (reviewData) => {
  const review = reviewData.review.item
    ? reviewData.review.item
    : reviewData.review;

  const starCount = parseInt(review["im:rating"].label);
  const stars = Array(starCount)
    .fill(0)
    .map((_, i) => i * i)
    .map((star) => <Icon color="yellow" name="star" />);
  return (
    <div className="comment-card">
      <Card fluid className="comment">
        <Card.Content>
          <Card.Header>
            <Button floated="left" disabled={true}>
              iOS
            </Button>
            {review.title.label}
            {stars}
          </Card.Header>
          <Card.Meta>
            <span className="date"></span>
          </Card.Meta>
          <Card.Description>{review.content.label}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <strong> by {review.author.name.label} </strong>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ReviewCard;
