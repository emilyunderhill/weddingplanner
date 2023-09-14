import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from './types'
import { register } from './authApi'

type UserState = {
  isAuthenticated: boolean
  isLoading: boolean
  errors: string | null
  user: Partial<User> | null
}

const initialState: UserState = {
  isAuthenticated: false,
  isLoading: false,
  errors: null,
  user: null
}

const name = 'user'

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
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(register.fulfilled, (state, { payload }) => {
      const user = {
        firstName: payload.first_name,
        lastName: payload.last_name,
        email: payload.email,
      }
      state.user = user
      state.isLoading = false
      state.errors = null
    })
    builder.addCase(register.rejected, (state, action) => {
      state.user = null
      state.isLoading = false
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.errors = action.payload.errorMessage
      } else {
        state.errors = action.error.message ?? null
      }
    }),
      builder.addCase(register.pending, (state, action) => {
        state.errors = null
        state.user = null
        state.isLoading = false
      })
  },
})

export default userSlice.reducer
