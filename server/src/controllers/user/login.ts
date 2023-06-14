import type { RequestHandler } from 'express'
import type { ServerResponse } from '../../../../shared/types/ServerResponseTypes'
import type { UserLoginLoad } from '../../types/UserSharedTypes'
import { createSuccessResponseObj } from '../../utils/serverResponseMethods'

export const login = (((_req, res) => {
  let serverResponse: ServerResponse<UserLoginLoad> | null = null

  serverResponse = createSuccessResponseObj({
    token: ''
  })
  res.json(serverResponse)
}) as RequestHandler)
