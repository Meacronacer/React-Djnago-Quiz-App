import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const quizApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
    endpoints: (builder) => ({
        getQuizList: builder.query({
            query: () => '/quiz/'
        }),
        getQuizDetail: builder.query({
            query: (slug) => `/quiz/${slug}/`
        }),
        getQuizQuestions: builder.query({
            query: (slug) => `/questions/${slug}/`
        })
    })
})

export const { useGetQuizListQuery, useGetQuizDetailQuery, useGetQuizQuestionsQuery } = quizApi