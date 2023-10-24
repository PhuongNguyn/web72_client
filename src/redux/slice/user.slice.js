import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { password, ...returnUser } = action.payload.user
            localStorage.setItem("user", JSON.stringify(returnUser))
            localStorage.setItem("token", action.payload.token)
            state.user = action.payload.user
        }
    },
})

export const { loginSuccess } = userSlice.actions

export default userSlice.reducer