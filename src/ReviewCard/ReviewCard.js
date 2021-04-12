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

const ReviewCard = (props) => (
  <div>
    {/* <Image src="/images/avatar/large/matthew.png" wrapped ui={false} /> */}
    <Card.Content>
      <Card.Header>
        <Button floated="left" disabled={true}>
          iOS
        </Button>
        I use it every day!
        <Icon color="yellow" name="star" />
      </Card.Header>
      <Card.Meta>
        <span className="date"></span>
      </Card.Meta>
      <Card.Description>
        I've only been using this for a short itme, but I really love it so far!
        It's not 100 percent perfect, etc, etc. etc.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>Hey now</Card.Content>
  </div>
);

export default ReviewCard;
