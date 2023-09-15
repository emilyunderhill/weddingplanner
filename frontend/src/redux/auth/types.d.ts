export type User = {
  firstName: string,
  lastName: string,
  email: string
}

export type RegisterArg = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type RegisterResponse = {
  first_name: string
  last_name: string
  email: string
}

export type ValidationError = Record<string, string[]>

export type UserState = {
  isAuthenticated: boolean
  isLoading: boolean
  errors: ValidationError | null
  user: User | null
  accessToken: string | null
  refreshToken: string | null
}

export type LoginArg = {
  email: string
  password: string
}

export type LoginResponse = {
  access: string
  refresh: string
}

export type GetUserDetailsRespone = RegisterResponse
