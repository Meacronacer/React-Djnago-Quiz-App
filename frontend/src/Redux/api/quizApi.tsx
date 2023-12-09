import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseFetch'

export const quizApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getQuizList: builder.query({
            query: () => '/quiz/'
        }),
        getQuizDetail: builder.query({
            query: (slug) => `/quiz/${slug}/`
        }),
        getQuizQuestions: builder.query({
            query: (slug) => `/questions/${slug}/`
        }),
        saveQuizResult: builder.mutation({
            query: ({data, token}) => ({
                url: '/quizs/results/',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(data)
            })
        }),
        getMyProfile: builder.query({
            query: token => ({
                url: '/quizs/results/',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }
            })
        })
        
    })
})

export const {
    useGetQuizListQuery,
    useGetQuizDetailQuery,
    useGetQuizQuestionsQuery,
    useSaveQuizResultMutation,
    useGetMyProfileQuery
} = quizApi