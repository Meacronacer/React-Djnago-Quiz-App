import { createSlice } from '@reduxjs/toolkit'

type answer = {
    id: string;
    userAnswers: object;
}

type answersState = {
    userAnswers: answer[]
    qIndex: number
    quizName: string
    score: number
    rightAnswers: number
    maxPoints: number
}


const initialState:answersState = {
    userAnswers: [],
    qIndex: 0,
    quizName: '',
    score: 0,
    rightAnswers: 0,
    maxPoints: 0,
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
            state.score = 0
            state.rightAnswers = 0
            state.maxPoints = 0
        },
        nextQuestion: (state) => {
            state.qIndex = state.qIndex + 1
        },
        setQuizName: (state, action) => {
            state.quizName = action.payload
        },
        changeScore: (state, action) => {
            state.score = state.score + action.payload
            state.rightAnswers = state.rightAnswers + 1
        },
        changeMaxpoints: (state, action) => {
            state.maxPoints = state.maxPoints + action.payload
        }
    }
})

export default answersSlice.reducer
export const { addAnswer, nextQuestion, clearUserAnswers, setQuizName, changeScore, changeMaxpoints } = answersSlice.actions