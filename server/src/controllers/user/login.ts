import type { RequestHandler } from 'express'
import type { ServerResponse } from '../../../../shared/types/ServerResponseTypes'
import type { UserLoginLoad } from '../../types/UserSharedTypes'
import { createErrorResponseObj, createSuccessResponseObj } from '../../utils/serverResponseMethods'
import { findErrInLoginData } from '../../../../shared/loginDataValidator'

export const login = (((req, res) => {
  let serverResponse: ServerResponse<UserLoginLoad> | null = null

  const errorMsg = findErrInLoginData(req.body)
  if (errorMsg !== null) {
    serverResponse = createErrorResponseObj(errorMsg)
    res.status(400).json(serverResponse)
    return
  }

  serverResponse = createSuccessResponseObj({
    token: ''
  })
  res.json(serverResponse)
}) as RequestHandler)
