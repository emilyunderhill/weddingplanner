import { GetUserDetailsRespone, LoginArg, LoginResponse, RegisterArg, RegisterResponse, ValidationError } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import useUser from '../../hooks/useUser';
import useAppSelector from '../../hooks/useAppSelector';
import { selectUser } from './userSlice';

export const register = createAsyncThunk<RegisterResponse, RegisterArg, { rejectValue: ValidationError }>(
  'users/register',
  async ({ email, firstName, lastName, password }, thunkAPI) => {
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
        const { dispatch } = thunkAPI
        dispatch(login({ email, password }))

        return data
      }

      return thunkAPI.rejectWithValue(data)
    } catch (err) {
      const error = err as AxiosError<ValidationError>

      if (!error.response) {
        throw err
      }

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const login = createAsyncThunk<LoginResponse, LoginArg, { rejectValue: ValidationError }>(
  'auth/token/obtain',
  async ({ email, password }, thunkAPI) => {
    const body = JSON.stringify({
      email,
      password,
    })

    try {
      const res = await fetch(`/api/auth/token/obtain/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body
      })

      const data = await res.json()

      if (res.status === 200) {
        const { dispatch } = thunkAPI
        //Wait 2s before fetching local storage in order for it to be persisted
        setTimeout(() => {
          dispatch(getUserDetails())
        }, 2000)


        return data
      }

      return thunkAPI.rejectWithValue(data)
    } catch (err) {
      const error = err as AxiosError<ValidationError>

      if (!error.response) {
        throw err
      }

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getUserDetails = createAsyncThunk<GetUserDetailsRespone, void, { rejectValue: ValidationError }>(
  'users/profile',
  async (_, thunkAPI) => {
    const storedUserData = window.localStorage.getItem('persist:user')
    if (!storedUserData) {
      return
    }

    const storedAuthData = JSON.parse(storedUserData).auth
    if (!storedAuthData) {
      return
    }

    const accessToken = JSON.parse(storedAuthData).accessToken

    try {
      const res = await fetch('/api/users/profile', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      })

      const data = await res.json()

      if (res.status === 200) {
        return data
      }

      return thunkAPI.rejectWithValue(data)
    } catch (err) {
      console.log({ err })
      const error = err as AxiosError<ValidationError>

      if (!error.response) {
        throw err
      }

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
