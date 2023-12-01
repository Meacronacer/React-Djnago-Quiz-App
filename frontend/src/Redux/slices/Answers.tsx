import { createSlice } from '@reduxjs/toolkit'

type answer = {
    id: string;
    userAnswers: object;
}

type answersState = {
    userAnswers: answer[]
    qIndex: number,
    quizName: string
}


const initialState:answersState = {
    userAnswers: [],
    qIndex: 0,
    quizName: ''
}


const answersSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {
        addAnswer: (state, action) => {
            state.userAnswers.push(action.payload)
        },
        clearUserAnswers: (state) => {
            state.userAnswers = []
            state.qIndex = 0
        },
        nextQuestion: (state) => {
            state.qIndex = state.qIndex + 1
        },
        setQuizName: (state, action) => {
            state.quizName = action.payload
        }
    }
})

export default answersSlice.reducer
export const { addAnswer, nextQuestion, clearUserAnswers, setQuizName } = answersSlice.actions