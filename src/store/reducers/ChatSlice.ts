import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IRtkError} from "../../models/IRtkError";

interface ChatState {
  errorInfo: IRtkError
  datetime: string
}

const initialState: ChatState = {
  errorInfo: {
    status: null,
  },
  datetime: ''
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<any>) {
      state.errorInfo = action.payload
    },
    setDatetime(state, actions: PayloadAction<string>) {
      state.datetime = actions.payload
    }
  }
})

export default chatSlice.reducer