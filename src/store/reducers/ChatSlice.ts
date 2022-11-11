import {createSlice} from "@reduxjs/toolkit";

interface ChatState {
  loading: boolean
  error: null | string
}

const initialState: ChatState = {
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