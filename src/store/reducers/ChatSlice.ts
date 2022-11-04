import {IGetMessage} from "../../modules/IGetMessage";
import {createSlice} from "@reduxjs/toolkit";

interface ChatState {
  messages: IGetMessage[]
  loading: boolean
  error: null | string
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: {}
})

export default chatSlice.reducer