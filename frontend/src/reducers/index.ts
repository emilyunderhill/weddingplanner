import { History, createBrowserHistory } from 'history';
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth'
import type { RootState } from '../store'
import { connectRouter } from 'connected-react-router'

const history = createBrowserHistory()

export default combineReducers({
  auth: auth,
  router: connectRouter(history),
})

export const isAuthenticated =
  (state: RootState)  => fromAuth.isAuthenticated(state.auth)
export const accessToken =
  (state: RootState) => fromAuth.accessToken(state.auth)
export const isAccessTokenExpired =
  (state: RootState) => fromAuth.isAccessTokenExpired(state.auth)
export const refreshToken =
  (state: RootState) => fromAuth.refreshToken(state.auth)
export const isRefreshTokenExpired =
  (state: RootState) => fromAuth.isRefreshTokenExpired(state.auth)
export const authErrors =
  (state: RootState) => fromAuth.errors(state.auth)
