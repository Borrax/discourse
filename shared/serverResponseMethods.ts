import type { ErrorResponse, SuccessResponse } from './types/ServerResponseTypes'

export const isSuccessResponseObj = <T>(obj: SuccessResponse<T> | null): obj is SuccessResponse<T> => {
  if (obj === null) return false
  if ('load' in obj) return true

  return false
}

export const isErrorResponseObj = (obj: ErrorResponse | null): obj is ErrorResponse=> {
  if (obj === null) return false
  if ('err' in obj) return true

  return false
}
