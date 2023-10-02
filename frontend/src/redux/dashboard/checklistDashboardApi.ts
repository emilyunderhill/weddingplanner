import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CompleteChecklistItemArg, CompleteChecklistItemResponse, GetChecklistDashboardResponse } from './types'
import { RootState } from '../../store'


export const reducerPath = 'checklistDashboard'

const checklistDashboardApi = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/weddingplanner/',
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
        url: 'dashboard/checklist',
      }),
      providesTags: ['ChecklistDashboard']
    }),
    completeChecklistItem: builder.mutation<CompleteChecklistItemResponse, CompleteChecklistItemArg>({
      query: ({ id }) => {
        return {
          url: 'completeChecklistItem',
          method: 'POST',
          body: { checklist_item_id: id },
        }
      },
      invalidatesTags: ['ChecklistDashboard']
    })
  })
})


export const { useGetChecklistDashboardQuery, useCompleteChecklistItemMutation } = checklistDashboardApi

export const checklistReducer = checklistDashboardApi.reducer

export default checklistDashboardApi
