import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { apiMiddleware } from 'redux-api-middleware';
import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { createFilter } from 'redux-persist-transform-filter';
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers'
import { History } from 'history';
import { useSelector, useDispatch } from 'react-redux'

const initStore = (history: History) => {
  const persistedFilter = createFilter(
    'auth', ['access', 'refresh']);

  const reducer = persistReducer(
    {
      key: 'polls',
      storage: storage,
      whitelist: ['auth'],
      transforms: [persistedFilter]
    },
    rootReducer)

  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }).concat(apiMiddleware,
      routerMiddleware(history)),
    devTools: process.env.NODE_ENV !== 'production',
  })

  persistStore(store)
  return store
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof initStore>["dispatch"]
export const useAppDispatch: () => AppDispatch = useDispatch


export default initStore

export const authSelector = (state: RootState) => useSelector(state.auth)
