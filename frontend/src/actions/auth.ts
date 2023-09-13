import { RSAA, RSAARequestType, RSAASuccessType, RSAAFailureType } from 'redux-api-middleware';
export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';
export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';

type Method = 'GET' | 'POST'

export const login = (username: string, password: string) => ({
  [RSAA]: {
    endpoint: '/api/auth/token/obtain/',
    method: 'POST' as Method,
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    types: [
      LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
    ] as [RSAARequestType<any, any, any>, RSAASuccessType<any, any, any>, RSAAFailureType<any, any, any>]
  }
})
export const refreshAccessToken = (token: string) => ({
  [RSAA]: {
    endpoint: '/api/auth/token/refresh/',
    method: 'POST',
    body: JSON.stringify({ refresh: token }),
    headers: { 'Content-Type': 'application/json' },
    types: [
      TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
    ]
  }
})