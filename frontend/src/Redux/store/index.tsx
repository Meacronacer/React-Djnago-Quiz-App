import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { quizApi } from "../api/quizApi";
import answersSlice from '../slices/Answers'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['answers']
}

const reducers = combineReducers({
    answers: answersSlice,
    [quizApi.reducerPath]: quizApi.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(quizApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})


export const persistor = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch