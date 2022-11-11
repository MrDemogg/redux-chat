import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {IGetMessage} from "../modules/IGetMessage";
import {IPostMessage} from "../modules/IPostMessage";

export const chatAPI = createApi({
  reducerPath: 'chatAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchAllMessages: build.query<IGetMessage[], number>({
      query: (date) => ({
        url: '/messages',
        method: 'GET',
        params: {
          datetime: date ? date : null
        }
      }),
      providesTags: result => ['Post']
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