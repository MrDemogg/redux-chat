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
    dispatch(chatSlice.actions.setError({status: null}))
    refetch()
  }

  return (
    <Card style={{width: '70%'}}>
      <Card.Body style={{height: '70%', overflowY: 'scroll'}}>
        {isLoading
          ? <div style={{margin: 'auto', width: 80}}>
              <Triangle
                height="80"
                width="80"
                color="#4fa94d"
                visible={isLoading}
              />
            </div>
          : errorInfo.status
            ? <div style={{width: 400, margin: '0 auto'}}>
                <CustomCard
                  header={`Ошибка! Статус ошибки: ${errorInfo.status}`}
                  body={errorInfo.data ? errorInfo.data : errorInfo.status}
                  footer={<Button
                    onClick={refetchHandler}
                    style={{width: '100%'}}
                  >Отправить запрос заново</Button>}
                />
              </div>
            : messages && messages.length > 0 ? messages.map(message =>
                <div style={{marginTop: 20}} key={message.id}><CustomCard
                  header={message.author}
                  body={message.message}
                  footer={<Card.Text>Дата отправки: {message.datetime}</Card.Text>}
                /></div>
              )
              : <Card.Title style={{textAlign: 'center'}}>Сообщений, пока, нет</Card.Title>
        }
      </Card.Body>
    </Card>
  );
};

export default Messages;