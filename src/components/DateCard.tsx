import React, {useState} from 'react';
import {Button, Card} from "react-bootstrap";
import {useAppDispatch} from "../hooks/redux";
import {chatSlice} from "../store/reducers/ChatSlice";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TextField} from "@mui/material";

const DateCard = () => {
  const [date, setDate] = useState(null)
  const [disabledReset, setDisabledReset] = useState(true)
  const dispatch = useAppDispatch()

  const changeDatetimeHandler = () => {
    if (date) {
      setDisabledReset(false)
      console.log(new Date(date).toLocaleString().slice(0, -3))
      dispatch(chatSlice.actions.setDatetime(new Date(date).toLocaleString().slice(0, -3)))
    }
  }

  const resetDatetimeHandler = () => {
    setDate(null)
    dispatch(chatSlice.actions.setDatetime(''))
    setDisabledReset(true)
  }

  return (
    <Card>
      <Card.Header><Card.Title style={{textAlign: 'center'}}>Запрос сообщений с определённой даты</Card.Title></Card.Header>
      <Card.Body>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Выберите дату"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
          />
        </LocalizationProvider>
      </Card.Body>
      <Card.Footer>
        <Button style={{width: '100%'}} onClick={changeDatetimeHandler}>Отправить запрос</Button>
        <Button style={{width: '100%', marginTop: 20}} disabled={disabledReset} onClick={resetDatetimeHandler}>Сбросить</Button>
      </Card.Footer>
    </Card>
  );
};

export default DateCard;