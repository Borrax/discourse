export type SuccessResponse<T> = {
  load: T | null
}

export type ErrorResponse = {
  err: String | null
}

export type ServerResponse<T> = SuccessResponse<T> | ErrorResponse
