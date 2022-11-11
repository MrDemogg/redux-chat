import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {IGetMessage} from "../modules/IGetMessage";

export const chatAPI = createApi({
  reducerPath: 'chatAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchAllMessages: build.query<IGetMessage[]>
  })
})