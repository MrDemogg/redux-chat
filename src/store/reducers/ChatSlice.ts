import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IRtkError} from "../../models/IRtkError";

interface ChatState {
  errorInfo: IRtkError
  message: string
  datetime: string
}

const initialState: ChatState = {
  errorInfo: {
    status: null,
  },
  message: '',
  datetime: ''
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload
    },
    setError(state, action: PayloadAction<any>) {
      state.errorInfo = action.payload
    },
    setDatetime(state, actions: PayloadAction<string>) {
      state.datetime = actions.payload
    },
  }
})

export default chatSlice.reducer