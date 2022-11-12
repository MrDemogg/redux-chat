import React from 'react';
import {chatAPI} from "../service/ChatService";
import {Card} from "react-bootstrap";
import {Triangle} from "react-loader-spinner";
import {useAppSelector} from "../hooks/redux";

const Messages = () => {
  const {datetime} = useAppSelector(state => state.chatReducer)
  const {data: messages, isLoading, error} = chatAPI.useFetchAllMessagesQuery(datetime)
  if (error) {
    console.log(error)
  }
  return (
    <Card>
      <Card.Body style={{height: '70%', overflowY: 'scroll'}}>
        {isLoading
          ? <div style={{margin: '0 auto', width: 320}}>
              <Triangle
                height="80"
                width="80"
                color="#4fa94d"
                visible={isLoading}
              />
            </div>
          : messages && messages.map(message =>
            <Card key={message.id} style={{maxWidth: '50%', marginTop: 20}}>
              <Card.Header><Card.Title>{message.author}</Card.Title></Card.Header>
              <Card.Body><Card.Text>{message.message}</Card.Text></Card.Body>
              <Card.Footer><Card.Text>Дата отправления: {message.datetime}</Card.Text></Card.Footer>
            </Card>
          )
        }
      </Card.Body>
    </Card>
  );
};

export default Messages;