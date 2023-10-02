import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CompleteChecklistItemArg, CompleteChecklistItemResponse, DeleteChecklistItemArg, DeleteChecklistItemResponse, GetChecklistDashboardResponse } from './types'
import { RootState } from '../../store'
import { CreateChecklistItemArg, CreateChecklistItemResponse } from '../checklist/types'


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
          url: 'checklist/complete',
          method: 'POST',
          body: { checklist_item_id: id },
        }
      },
      invalidatesTags: ['ChecklistDashboard']
    }),
    createChecklistItem: builder.mutation<CreateChecklistItemResponse, CreateChecklistItemArg>({
      query: ({ title, topPriority }) => {
        return {
          url: 'checklist/create',
          method: 'POST',
          body: {
            title,
            top_priority: !!topPriority
          }
        }
      },
      invalidatesTags: ['ChecklistDashboard']
    }),
    deleteChecklistItem: builder.mutation<DeleteChecklistItemResponse, DeleteChecklistItemArg>({
      query: ({ id }) => {
        return {
          url: 'checklist/delete',
          method: 'POST',
          body: { checklist_item_id: id }
        }
      },
      invalidatesTags: ['ChecklistDashboard']
    })
  })
})


export const {
  useGetChecklistDashboardQuery,
  useCompleteChecklistItemMutation,
  useCreateChecklistItemMutation,
  useDeleteChecklistItemMutation,
} = checklistDashboardApi

export const checklistReducer = checklistDashboardApi.reducer

export default checklistDashboardApi
