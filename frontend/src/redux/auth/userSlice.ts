import { createSlice } from '@reduxjs/toolkit'
import { UserState } from './types'
import { login, register } from './authApi'
import { RootState } from '../../store'

const initialState: UserState = {
  isAuthenticated: false,
  isLoading: false,
  errors: null,
  user: null,
  accessToken: null,
  refreshToken: null,
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
      state.accessToken = null
      state.refreshToken = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.errors = null
    })
    builder.addCase(register.rejected, (state, { payload }) => {
      state.isLoading = false
      state.errors = payload ?? null
    }),
    builder.addCase(register.pending, state => {
      state.errors = null
      state.isLoading = false
    }),
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true
      state.errors = null
      state.isLoading = false
      state.accessToken = payload.access
      state.refreshToken = payload.refresh
    }),
    builder.addCase(login.pending, state => {
      state.isAuthenticated = false
      state.errors = null
      state.isLoading = true
      state.accessToken = null
      state.refreshToken = null
    }),
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isAuthenticated = false
      state.errors = payload ?? null
      state.isLoading = false
      state.accessToken = null
      state.refreshToken = null
    })
  },
})

export default userSlice.reducer

export const selectUser = (state: RootState) => state[name]
