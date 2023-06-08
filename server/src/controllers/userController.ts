import type { RequestHandler } from 'express'
import type { UserRegData, UserRegResponse, UserRegResponseLoad } from '../../../shared/UserSharedTypes'
import { User } from '../models/user'
import { isErrorResponseObj, createErrorResponseObj, createSuccessResponseObj } from '../../../shared/serverResponseMethods'

// the new user's username and password length lower and upper limits
const MIN_USERNAME_LEN = 3
const MAX_USERNAME_LEN = 20
const MIN_PASSWORD_LEN = 6
const MAX_PASSWORD_LEN = 30

/**
* @function Goes through the the fields of the user registration
* and looks for inconsistencies
* @return A string with the error message if it finds
* anything or null if it doesn't
*/
const findErrInRegData = (regData: UserRegData | null): string | null => {
  if (regData === null || typeof regData !== 'object') {
    return 'No registration data provided'
  }

  const { username, password } = regData

  if (username == null || typeof username !== 'string') {
    return 'Missing username'
  }

  if (username.length < MIN_USERNAME_LEN ||
    username.length > MAX_USERNAME_LEN) {
    return `Username should be between ${MIN_USERNAME_LEN} and ${MAX_USERNAME_LEN} characters long`
  }

  if (password == null || typeof password !== 'string') {
    return 'Missing password'
  }

  if (password.length < MIN_PASSWORD_LEN ||
  password.length > MAX_PASSWORD_LEN) {
    return `Password should be between ${MIN_PASSWORD_LEN} and ${MAX_PASSWORD_LEN} characters long`
  }

  return null
}

const register = ((async (req, res) => {
  const regData: UserRegData | null = req.body
  let serverResponse: UserRegResponse | null = null

  const errorMsg = findErrInRegData(regData)
  if (errorMsg !== null) {
    serverResponse = createErrorResponseObj(errorMsg)
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
