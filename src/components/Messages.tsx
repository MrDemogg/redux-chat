import React from 'react';
import {chatAPI} from "../service/ChatService";
import {Button, Card} from "react-bootstrap";
import {Triangle} from "react-loader-spinner";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {chatSlice} from "../store/reducers/ChatSlice";
import CustomCard from "./UI/CustomCard";

const Messages = () => {
  const {datetime, errorInfo} = useAppSelector(state => state.chatReducer)
  const dispatch = useAppDispatch()
  const {data: messages, isLoading, error, refetch} = chatAPI.useFetchAllMessagesQuery(datetime)
  if (error) {
    dispatch(chatSlice.actions.setDatetime(''))
    dispatch(chatSlice.actions.setError(error))
  }

  const refetchHandler = () => {
    dispatch(chatSlice.actions.setError({error: '', status: ''}))
    refetch()
  }

  return (
    <Card>
      <Card.Body style={{height: '70%', overflowY: 'scroll'}}>
        {isLoading
          ? <div style={{margin: '0 auto', width: 80}}>
              <Triangle
                height="80"
                width="80"
                color="#4fa94d"
                visible={isLoading}
              />
            </div>
          : errorInfo.error.length > 0
            ? <div style={{width: 400, margin: '0 auto'}}>
                <CustomCard
                  header={'Ошибка'}
                  body={errorInfo.error}
                  footer={<Button
                    onClick={refetchHandler}
                    style={{width: '100%'}}
                  >Отправить запрос заново</Button>}
                />
              </div>
            : messages && messages.length > 0 && messages.map(message =>
              <div style={{marginTop: 20}} key={message.id}><CustomCard
                header={message.author}
                body={message.message}
                footer={<Card.Text>Дата отправки: {new Date(message.datetime).toUTCString()}</Card.Text>}
              /></div>
            )
        }
      </Card.Body>
    </Card>
  );
};

export default Messages;