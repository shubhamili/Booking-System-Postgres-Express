
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


export interface user {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    token: string
}


export interface AuthState {
    isAuthenticated: boolean;
    user: user | null;
    isAuthChecked: boolean;
}


const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    isAuthChecked: false
}


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<user>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isAuthChecked = true;
        },
        authCheckComplete: (state) => {
            state.isAuthChecked = true
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isAuthChecked = true
        },
    }
})


export const { setUser, logout, authCheckComplete } = authSlice.actions

export default authSlice.reducer