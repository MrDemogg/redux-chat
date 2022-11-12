import React, {FC, ReactNode} from 'react';
import {Card} from "react-bootstrap";

interface CustomCardProps {
  header: string,
  body: string | number,
  footer: ReactNode
}

const CustomCard: FC<CustomCardProps> = ({header, body, footer}) => {
  return (
    <Card style={{maxWidth: '70%'}}>
      <Card.Header><Card.Title>{header}</Card.Title></Card.Header>
      <Card.Body><Card.Text>{body}</Card.Text></Card.Body>
      <Card.Footer>{footer}</Card.Footer>
    </Card>
  );
};

export default CustomCard;