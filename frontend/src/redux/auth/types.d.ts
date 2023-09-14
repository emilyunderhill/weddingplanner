export type User = {
  id: number,
  firstName: string,
  lastName: string,
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

export type ValidationError = {
  errorMessage: string
  field_errors: Record<string, string>
}
