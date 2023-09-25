import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { getChecklist } from './checklistApi'

const initialState = {
  isLoading: false,
  errors: null,
  data: null,
}

export const name = 'checklist'

const checklistSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChecklist.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.errors = null
      state.data = payload
    })
    builder.addCase(getChecklist.rejected, (state, { payload }) => {
      state.isLoading = false
      state.errors = payload ?? null
    })
    builder.addCase(getChecklist.pending, state => {
      state.errors = null
      state.isLoading = false
      state.data = null
    })
  },
})


export default checklistSlice.reducer

export const selectChecklist = (state: RootState) => state[name]
