import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {IGetMessage} from "../modules/IGetMessage";
import {IPostMessage} from "../modules/IPostMessage";

export const chatAPI = createApi({
  reducerPath: 'chatAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchAllMessages: build.query<IGetMessage[], number>({
      query: (limit: number = 30) => ({
        url: '/messages',
        params: {
          _limit: limit,
        }
      }),
      providesTags: result => ['Post']
    }),
    fetchMessage: build.query<IGetMessage, string>({
      query: (datetime) => ({
        url: '/messages',
        params: {
          datetime: datetime
        }
      })
    }),
    createMessage: build.mutation<IGetMessage, IPostMessage>({
      query: (post) => ({
        url: '/messages',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Post']
    })
  })
})