import React from "react";
import { Card } from "semantic-ui-react";
import { Button, Icon } from "semantic-ui-react";

const ReviewCard = (reviewData) => {
  const review = reviewData.review.item
    ? reviewData.review.item
    : reviewData.review;

  const starCount = parseInt(review["im:rating"]?.label);
  const stars = Array(starCount || 0)
    .fill(0)
    .map((_, i) => i * i)
    .map((star) => <Icon color="yellow" name="star" />);

  let happyRating = '';
  let sentiment = review?.sentiment;
  switch (true) {
    case sentiment >= .4:
      happyRating = '😃';
      break;
    case sentiment >= .1 && sentiment < .4:
      happyRating = '🙂';
      break;
    case sentiment >= 0 && sentiment < .1:
      happyRating = '🤨';
      break;
    case sentiment >= -.16 && sentiment < 0:
      happyRating = '🙁';
      break;
    case sentiment < -.16:
      happyRating = '😡';
      break;
    default:
      happyRating = '';
  }
  sentiment = parseFloat(sentiment.toFixed(2));

  return (
    <div className="comment-card">
      <Card fluid className="comment">
        <Card.Content>
          <Card.Header>
            <Button floated="left" disabled={true}>
              iOS
            </Button>
            {review?.title?.label}
            {stars}
            {happyRating}
            <span className="sentiment"> {sentiment}</span>
          </Card.Header>
          <Card.Meta>
            <span className="date"></span>
          </Card.Meta>
          <Card.Description>{review?.content?.label}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <strong> by {review?.author?.name?.label} </strong>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ReviewCard;
