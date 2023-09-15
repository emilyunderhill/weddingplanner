import { RegisterArg, RegisterResponse, ValidationError } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'

export const register = createAsyncThunk<RegisterResponse, RegisterArg, {rejectValue: ValidationError}>(
  'users/register',
  async ({email, firstName, lastName, password}, thunkAPI) => {
    const body = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    })

    try {
      const res = await fetch(`/api/users/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body
      })

      const data = await res.json()

      if (res.status === 201) {
        return data
      }

      return thunkAPI.rejectWithValue(data)
    } catch (err) {
      console.log({err})
      const error = err as AxiosError<ValidationError>

      if (!error.response) {
        throw err
      }

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
