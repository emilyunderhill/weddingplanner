import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CreateChecklistItemArg, CreateChecklistItemResponse, GetChecklistResponse } from './types'
import { RootState } from '../../store'


export const reducerPath = 'checklist'

const checklistApi = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/weddingplanner/',
    prepareHeaders: (headers, {getState}) => {
      const rootState = getState() as RootState
      const accessToken = rootState.auth.accessToken

      headers.set('Accept', 'application/json')
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
  }),
  tagTypes: ['Checklist'],
  endpoints: (builder) => ({
    getChecklist: builder.query<GetChecklistResponse, void>({
      query: () => ({
        url: 'checklist',
      }),
      providesTags: (result) => result
      ?
        [
          ...result.map(({ id }) => ({ type: 'Checklist', id } as const)),
          { type: 'Checklist', id: 'LIST' },
        ]
      :
        [{ type: 'Checklist', id: 'LIST' }],
    }),
    createChecklistItem: builder.mutation<CreateChecklistItemResponse, CreateChecklistItemArg>({
      query: ({ title }) => {
        return {
          url: 'checklist/create',
          method: 'POST',
          body: { title },
        }
      },
      invalidatesTags: [{ type: 'Checklist', id: 'LIST' }],
    })
  })
})


export const { useGetChecklistQuery, useCreateChecklistItemMutation } = checklistApi

export const checklistReducer = checklistApi.reducer

export default checklistApi
