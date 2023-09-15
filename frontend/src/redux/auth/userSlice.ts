import { createSlice } from '@reduxjs/toolkit'
import { UserState } from './types'
import { register } from './authApi'
import { RootState } from '../../store'

const initialState: UserState = {
  isAuthenticated: false,
  isLoading: false,
  errors: null,
  user: null
}

export const name = 'auth'

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.errors = null
      state.isLoading = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.isLoading = false
      const user = {
        firstName: payload.first_name,
        lastName: payload.last_name,
        email: payload.email,
      }
      state.user = user
    })
    builder.addCase(register.rejected, (state, { payload }) => {
      state.isLoading = false
      state.errors = payload ?? null
    }),
      builder.addCase(register.pending, state => {
        state.errors = null
        state.user = null
        state.isLoading = false
      })
  },
})

export default userSlice.reducer

export const selectUser = (state: RootState) => state[name]
