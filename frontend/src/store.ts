import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { apiMiddleware } from 'redux-api-middleware';
import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { createFilter } from 'redux-persist-transform-filter';
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers'
import { History } from 'history';
import { name as authKey } from './redux/auth/userSlice'

const initStore = (history: History) => {
  const reducer = persistReducer(
    {
      key: 'user',
      storage: storage,
      whitelist: [authKey],
      timeout: 1000,
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

export default initStore


export const persistor = (history: History<unknown>) => persistStore(initStore(history))
