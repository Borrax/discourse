export type SuccessResponse<T> = {
  load: T | null
}

export type ErrorResponse = {
  err: string
}

export type ServerResponse<T> = SuccessResponse<T> | ErrorResponse
