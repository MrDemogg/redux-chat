import React from 'react';
import {Card} from "react-bootstrap";
import Messages from "./Messages";
import DateCard from "./DateCard";

const Chat = () => {
  return (
    <Card>
      <Card.Body style={{height: '70%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', margin: '0 auto'}}>
        <Messages/>
        <DateCard/>
      </Card.Body>
    </Card>
  );
};

export default Chat;