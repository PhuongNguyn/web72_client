import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    token: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        }
    },
})

export const { loginSuccess } = userSlice.actions

export default userSlice.reducer