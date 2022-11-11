import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IError} from "../../models/IError";

interface ChatState {
  errorInfo: IError
  message: string
  datetime: string
}

const initialState: ChatState = {
  errorInfo: {
    message: '',
    errorGuilt: ''
  },
  message: '',
  datetime: ''
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.message = action.payload
    },
    setError(state, action: PayloadAction<IError>) {
      state.errorInfo = action.payload
    },
    setPosts(state, actions: PayloadAction<string>) {
      state.datetime = actions.payload
    }
  }
})

export default chatSlice.reducer