import { getStoredState, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { apiMiddleware } from 'redux-api-middleware';
import { configureStore } from '@reduxjs/toolkit'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers'
import { History, createBrowserHistory } from 'history';
import { name as authKey } from './redux/auth/userSlice'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import checklistApi from './redux/checklist/checklistApi';

const history = createBrowserHistory()

const persistConfig = {
  key: 'user',
  storage: storage,
  whitelist: [authKey],
  timeout: 1000,
  stateReconciler: autoMergeLevel2,
}

const initStore = (history: History) => {

  const reducer = persistReducer(
    persistConfig,
    rootReducer
  )

  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }).concat(
        checklistApi.middleware,
        apiMiddleware,
        routerMiddleware(history),
      ),
    devTools: process.env.NODE_ENV !== 'production',
  })

  persistStore(store)
  return store
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ReturnType<typeof initStore>["dispatch"]

export default initStore(history)

export const fetchStoredState = getStoredState(persistConfig)

export const persistor = (history: History<unknown>) => persistStore(initStore(history))
