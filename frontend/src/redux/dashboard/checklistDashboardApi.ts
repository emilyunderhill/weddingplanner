import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetChecklistDashboardResponse } from './types'
import { RootState } from '../../store'


export const reducerPath = 'checklistDashboard'

const checklistDashboardApi = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/weddingplanner/dashboard/',
    prepareHeaders: (headers, { getState }) => {
      const rootState = getState() as RootState
      const accessToken = rootState.auth.accessToken

      headers.set('Accept', 'application/json')
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
  }),
  tagTypes: ['ChecklistDashboard'],
  endpoints: (builder) => ({
    getChecklistDashboard: builder.query<GetChecklistDashboardResponse, void>({
      query: () => ({
        url: 'checklist',
      }),
      providesTags: ['ChecklistDashboard']
    }),
  })
})


export const { useGetChecklistDashboardQuery } = checklistDashboardApi

export const checklistReducer = checklistDashboardApi.reducer

export default checklistDashboardApi
