
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


export interface user {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    token: string
}
// {
//     "id": 1,
//         "name": "shubham singh",
//             "email": "shubha@gmail.com",
//                 "createdAt": "2025-10-01T16:43:47.278Z",
//                     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzaHViaGFAZ21haWwuY29tIiwiaWF0IjoxNzcxNzY0MDAyLCJleHAiOjE3NzIxOTYwMDJ9.CuAKor75lbggqkb81PkoV1Xffmx-uXxJStKvSQUya_k"
// }


export interface AuthState {
    isAuthenticated: boolean;
    user: user | null;
    loading: boolean;
}


const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false
}


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<user>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false
        },
    }
})


export const { setUser, logout } = authSlice.actions

export default authSlice.reducer