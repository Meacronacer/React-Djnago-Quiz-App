import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";


interface Iuser {
    exp: number
    iat: number
    jti: string
    token_type: string
    user_id: number
    username: string
}

interface initState {
    user: Iuser | null 
    token: string | null 
    refreshToken: string | null
}

const initialState: initState = {
    user: null,
    token: null,
    refreshToken: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = jwtDecode(action.payload.access)
            state.token = action.payload.access
            state.refreshToken = action.payload.refresh
        },
        setNewAccessToken: (state, action) => {
            state.token = action.payload.access
        },
        logoutUser: (state) => {
            state.user = null
            state.token = null
            state.refreshToken = null
        }
    }
})


export default authSlice.reducer

export const { setUser, logoutUser, setNewAccessToken } = authSlice.actions