import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api'}),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: userSumbitData => ({
                url: '/login/',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(userSumbitData),
            })
        }),
        getUser: builder.query({
            query: () => ({
                url: '/user/',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            })
        })
    })
})

export const { useLoginMutation, useGetUserQuery } = authApi