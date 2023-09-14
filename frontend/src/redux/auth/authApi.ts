import { RegisterArg, RegisterResponse, ValidationError } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

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
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (err) {
      const error = err as AxiosError<ValidationError>

      if (!error.response) {
        throw err
      }

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
