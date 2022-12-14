import { combineReducers, configureStore } from '@reduxjs/toolkit'
import chatReducer from './reducers/ChatSlice'
import {chatAPI} from "../service/ChatService";

const rootReducer = combineReducers({
  chatReducer,
  [chatAPI.reducerPath]: chatAPI.reducer
})

export const setupStore = (): any => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(chatAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']