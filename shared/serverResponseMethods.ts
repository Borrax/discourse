import type { ErrorResponse, SuccessResponse } from './types/ServerResponseTypes'

export const isSuccessResponseObj = <T>(obj: SuccessResponse<T> | null): boolean => {
  if (obj === null) return false
  if ('load' in obj) return true

  return false
}

export const isErrorResponseObj = (obj: ErrorResponse | null): boolean => {
  if (obj === null) return false
  if ('err' in obj) return true

  return false
}
