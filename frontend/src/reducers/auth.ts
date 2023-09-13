import jwtDecode from 'jwt-decode'
import * as auth from '../actions/auth'
import { PayloadAction } from '@reduxjs/toolkit'

export type Token = {
  token: string,
  exp: number,
}

type AuthState = {
  access: Token | undefined
  refresh: Token | undefined
  errors: object
}

const initialState: AuthState = {
  access: undefined,
  refresh: undefined,
  errors: {},
}
export default (state = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case auth.LOGIN_SUCCESS:
      return {
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access) as object
        },
        refresh: {
          token: action.payload.refresh,
          ...jwtDecode(action.payload.refresh) as object
        },
        errors: {}
      }
    case auth.TOKEN_RECEIVED:
      return {
        ...state,
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access) as object
        }
      }
    case auth.LOGIN_FAILURE:
    case auth.TOKEN_FAILURE:
      return {
        access: undefined,
        refresh: undefined,
        errors:
          action.payload.response ||
          { 'non_field_errors': action.payload.statusText },
      }
    default:
      return state
  }
}

export function accessToken(state: AuthState) {
  if (state.access) {
    return state.access.token
  }
}

export function refreshToken(state: AuthState) {
  if (state.refresh) {
    return state.refresh.token
  }
}

export function isAccessTokenExpired(state: AuthState) {
  if (state.access && state.access.exp) {
    return 1000 * state.access.exp - (new Date()).getTime() < 5000
  }
  return true
}
export function isRefreshTokenExpired(state: AuthState) {
  if (state.refresh && state.refresh.exp) {
    return 1000 * state.refresh.exp - (new Date()).getTime() < 5000
  }
  return true
}
export function isAuthenticated(state: AuthState) {
  return !isRefreshTokenExpired(state)
}
export function errors(state: AuthState) {
  return state.errors
}
