import React from 'react';
import {Card} from "react-bootstrap";
import Messages from "./Messages";
import Control from "./Control";

const Chat = () => {
  return (
    <Card style={{height: 900}}>
      <Messages/>
      <Card.Footer><Control /></Card.Footer>
    </Card>
  );
};

export default Chat;