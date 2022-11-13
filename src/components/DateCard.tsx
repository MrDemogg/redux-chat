import React, {useState} from 'react';
import {Button, Card} from "react-bootstrap";
import {useAppDispatch} from "../hooks/redux";
import {chatSlice} from "../store/reducers/ChatSlice";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Stack, TextField} from "@mui/material";
import {Dayjs} from "dayjs";

const DateCard = () => {
  const [date, setDate] = useState<Dayjs | null>(null)
  const [time, setTime] = useState<Dayjs | null>(null)
  const [disabledReset, setDisabledReset] = useState(true)
  const dispatch = useAppDispatch()

  const changeDatetimeHandler = () => {
    if (date && time) {
      setDisabledReset(false)
      const newDate = new Date(date.toISOString()).toLocaleString()
      const newTime = new Date(time.toISOString()).toLocaleString()
      dispatch(chatSlice.actions.setDatetime(newDate.slice(0, -8).concat(newTime.slice(-8))))
    }
  }

  const resetDatetimeHandler = () => {
    setDate(null)
    setTime(null)
    dispatch(chatSlice.actions.setDatetime(''))
    setDisabledReset(true)
  }

  return (
    <Card style={{height: 400, margin: 'auto', marginRight: 100, marginLeft: 100}}>
      <Card.Header><Card.Title style={{textAlign: 'center'}}>Запрос сообщений с определённой даты</Card.Title></Card.Header>
      <Card.Body>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={5}>
            <DatePicker
              label="Basic example"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              ampm={false}
              openTo="hours"
              views={['hours', 'minutes', 'seconds']}
              inputFormat="HH:mm:ss"
              mask="__:__:__"
              label="With seconds"
              value={time}
              onChange={(newValue) => {
                setTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
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