import type { RequestHandler } from 'express'
import type { UserRegData, UserRegResponse, UserRegResponseLoad } from '../../../shared/UserSharedTypes'
import type { ErrorResponse, SuccessResponse } from '../../../shared/ServerResponseTypes'
import { User } from '../models/user'
import { isErrorResponseObj } from '../../../shared/serverResponseMethods'

const createErrorResponseObj = (msg: string): ErrorResponse => {
  return {
    err: msg
  }
}

const createSuccessResponseObj = (load: UserRegResponseLoad): SuccessResponse<UserRegResponseLoad> => {
  return {
    load
  }
}

const isValidRegData = (regData: UserRegData | null): boolean => {
  if (regData === null || typeof regData !== 'object') {
    return false
  }

  const { username, password } = regData

  if (username == null || typeof username !== 'string') {
    return false
  }

  if (password == null || typeof password !== 'string') {
    return false
  }

  return true
}

const register = ((async (req, res) => {
  const regData: UserRegData | null = req.body
  let serverResponse: UserRegResponse | null = null

  if (!isValidRegData(regData)) {
    serverResponse = createErrorResponseObj('Invalid registration data')
    res.status(400).json(serverResponse)
    return
  }

  const { username, password } = regData as UserRegData

  const existingUser = await User.findOne({ username }).catch(err => {
    console.error('Something went wrong trying to find user with username:', username)
    console.error(err)
    serverResponse = createErrorResponseObj('Something went wrong with the server')
  })

  // if the check in the databases yielded some kind of
  // a database error the serverResponse would be assigned
  // in the catch clauses
  if (isErrorResponseObj(serverResponse)) {
    res.status(500).json(serverResponse)
    return
  }

  if (existingUser !== null) {
    serverResponse = createErrorResponseObj('User already exists')
    res.status(400).json(serverResponse)
    return
  }

  const userDataToSave = {
    username,
    password
  }

  const newUser = new User(userDataToSave)
  await newUser.save().catch(err => {
    console.error('error saving user', userDataToSave)
    console.error(err)
    serverResponse = createErrorResponseObj('Error registering the user')
  })

  // Checking if there is an error obj assigned to the server
  // response after the save user to db attempt
  if (isErrorResponseObj(serverResponse)) {
    res.status(500).json(serverResponse)
    return
  }

  const payloadForClient: UserRegResponseLoad = {
    username
  }

  serverResponse = createSuccessResponseObj(payloadForClient)

  res.json(serverResponse)
}) as RequestHandler)

export const UserController = {
  register
}
