import React from 'react';
import {chatAPI} from "../service/ChatService";
import {Button, Card} from "react-bootstrap";
import {Triangle} from "react-loader-spinner";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {chatSlice} from "../store/reducers/ChatSlice";
import CustomCard from "./UI/CustomCard";
import DateCard from "./DateCard";

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
    <>
      <Card.Header>
        <Button onClick={refetchHandler}>Refetch</Button>
      </Card.Header>
      <Card.Body>
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
            ? <div style={{margin: 'auto', width: 400}}>
                <CustomCard
                  header={`Ошибка! Статус ошибки: ${errorInfo.status}`}
                  body={errorInfo.data ? errorInfo.data : errorInfo.status}
                  footer={<Button
                    onClick={refetchHandler}
                    style={{width: '100%'}}
                  >Отправить запрос заново</Button>}
                />
              </div>
            : messages && messages.length > 0 ?
              <div style={{display: 'flex', justifyContent: 'space-between', height: 670, flexDirection: 'row'}}>
                <div style={{width: '100%', overflowY: 'scroll'}}>
                  {messages.map(message =>
                    <div style={{marginTop: 20, width: '90%'}} key={message.id}><CustomCard
                      header={message.author}
                      body={message.message}
                      footer={<Card.Text>Дата отправки: {message.datetime}</Card.Text>}
                    /></div>
                  )}
                </div>
                <DateCard/>
              </div>
              : <Card.Title style={{textAlign: 'center'}}>Сообщений, пока, нет</Card.Title>
        }
      </Card.Body>
    </>
  );
};

export default Messages;