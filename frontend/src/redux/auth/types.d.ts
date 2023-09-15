export type User = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  accessToken: string,
  refreshToken: string,
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
  user: Partial<User> | null
}
