import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import useUser from '../../hooks/useUser'


export const getChecklist = createAsyncThunk<any, string, { rejectValue: any }>(
  'users/register',
  async (accessToken, thunkAPI) => {

    try {
      const res = await fetch(`/api/users/checklist`, {
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
      const error = err as AxiosError<any>

      if (!error.response) {
        throw err
      }

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
