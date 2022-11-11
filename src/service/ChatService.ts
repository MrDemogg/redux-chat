import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {IGetMessage} from "../models/IGetMessage";
import {IPostMessage} from "../models/IPostMessage";

export const chatAPI = createApi({
  reducerPath: 'chatAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchAllMessages: build.query<IGetMessage[], string>({
      query: (datetime) => ({
        url: '/messages',
        method: 'GET',
        params: {
          datetime: datetime
        }
      }),
      providesTags: result => ['Post']
    }),
    postMessage: build.mutation<string, IPostMessage>({
      query: (message) => ({
        url: '/messages',
        method: 'POST',
        body: message
      }),
      invalidatesTags: ['Post']
    })
  })
})