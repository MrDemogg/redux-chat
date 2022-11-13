import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {chatAPI} from "../service/ChatService";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {chatSlice} from "../store/reducers/ChatSlice";

const Control = () => {
  const [author, setAuthor] = useState('')
  const [message, setMessage] = useState('')
  const [sendDisabled, setSendDisabled] = useState(false)
  const [postMessage] = chatAPI.usePostMessageMutation()
  const {errorInfo} = useAppSelector(state => state.chatReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (errorInfo.status) {
      setSendDisabled(true)
    } else {
      setSendDisabled(false)
    }
  }, [])

  const authorChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.currentTarget.value)
  }

  const messageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value)
  }

  const postHandler = () => {
    postMessage({author: author, message: message}).then((res: any) => {
      if (res.data !== 'success') {
        dispatch(chatSlice.actions.setError(res.error))
      } else {
        setAuthor('')
        setMessage('')
      }
    })
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '90%', margin: '0 auto', justifyContent: 'space-between'}}>
      <TextField value={author} onChange={authorChangeHandler} label="Автор" style={{height: '100%'}} />
      <TextField
        value={message}
        onChange={messageChangeHandler}
        label="Сообщение"
        multiline={true}
        rows={2}
      />
      <Button variant={'text'} onClick={postHandler} disabled={sendDisabled}>Отправить</Button>
    </div>
  );
};

export default Control;