import type { RequestHandler } from 'express'
import type { ServerResponse } from '../../../../shared/types/ServerResponseTypes'
import type { UserLoginLoad } from '../../types/UserSharedTypes'
import type { UserModel } from '../../models/user'

import { createErrorResponseObj, createSuccessResponseObj } from '../../utils/serverResponseMethods'
import { findErrInLoginData } from '../../../../shared/loginDataValidator'
import { User } from '../../models/user'
import { errorLogger } from '../../utils/errorLogger'
import { isErrorResponseObj } from '../../../../shared/serverResponseMethods'
// const JWT_KEY = 'this-is.averySecretKeyy'

export const login = ((async (req, res) => {
  let serverResponse: ServerResponse<UserLoginLoad> | null = null

  const errorMsg = findErrInLoginData(req.body)
  if (errorMsg !== null) {
    serverResponse = createErrorResponseObj(errorMsg)
    res.status(400).json(serverResponse)
    return
  }

  const username = req.body.username

  const existingUser = await User.findOne({ username })
    .catch(err => {
      errorLogger(new Error(`Error trying to find an
existing user on login attempt: `, err))
      serverResponse = createErrorResponseObj('Something went wrong')
    }) as UserModel | null

  // if the server response is an error object here
  // that means there was trouble trying to find the
  // user in the db and it got assigned to it in the
  // catch statement
  if (isErrorResponseObj(serverResponse)) {
    res.status(500).json(serverResponse)
    return
  }

  if (existingUser === null) {
    serverResponse = createErrorResponseObj('Incorrect username or password')
    res.status(400).json(serverResponse)
    return
  }

  const password = req.body.password
  if (existingUser.password !== password) {
    serverResponse = createErrorResponseObj('Incorrect username or password')
    res.status(400).json(serverResponse)
    return
  }

  serverResponse = createSuccessResponseObj({
    token: ''
  })

  res.json(serverResponse)
}) as RequestHandler)
