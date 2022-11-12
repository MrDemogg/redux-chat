import React from 'react';
import {Card} from "react-bootstrap";
import Messages from "./Messages";

const Chat = () => {
  return (
    <Card>
      <Card.Body>
        <Messages/>
      </Card.Body>
    </Card>
  );
};

export default Chat;