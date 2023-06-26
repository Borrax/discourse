import type { RequestHandler } from 'express'
import type { ServerResponse } from '../../../../shared/types/ServerResponseTypes'
import type { UserLoginLoad, UserLoginData } from '../../types/UserSharedTypes'
import type { UserModel } from '../../models/user'

import { createErrorResponseObj, createSuccessResponseObj } from '../../utils/serverResponseMethods'
import { User } from '../../models/user'
import { errorLogger } from '../../utils/errorLogger'
import { isErrorResponseObj } from '../../../../shared/serverResponseMethods'
import { createJWT } from '../../utils/jwtUtils'
import { allowedUserRegLengths, regDataValidationRegex } from '../../../../shared/userConstraintsShared'
import { comparePasswords } from '../../utils/passwordUtils'

const JWT_KEY = 'this-is.averySecretKeyy'

const {
  MIN_USERNAME_LEN, MAX_USERNAME_LEN,
  MIN_PASSWORD_LEN, MAX_PASSWORD_LEN
} = allowedUserRegLengths

const { USERNAME_REGEX, PASSWORD_REGEX } = regDataValidationRegex

/**
* @function Goes through the the fields of the user registration
* and looks for inconsistencies
* @return A string with the error message if it finds
* anything or null if it doesn't
*/
const findErrInLoginData = (loginData: UserLoginData | null): string | null => {
  if (loginData === null || typeof loginData !== 'object') {
    return 'No login data provided'
  }

  const { username, password } = loginData

  if (username == null || typeof username !== 'string') {
    return 'Missing username'
  }

  if (username.length < MIN_USERNAME_LEN ||
    username.length > MAX_USERNAME_LEN) {
    return `Username should be between ${MIN_USERNAME_LEN} and ${MAX_USERNAME_LEN} characters long`
  }

  if (!USERNAME_REGEX.test(username)) {
    return 'The username contains forbidden symbols'
  }

  if (password == null || typeof password !== 'string') {
    return 'Missing password'
  }

  if (password.length < MIN_PASSWORD_LEN ||
  password.length > MAX_PASSWORD_LEN) {
    return `Password should be between ${MIN_PASSWORD_LEN} and ${MAX_PASSWORD_LEN} characters long`
  }

  if (!PASSWORD_REGEX.test(password)) {
    return 'The password contains forbidden symbols'
  }

  return null
}

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

  const providedPassword = req.body.password
  const arePasswordsEqual = await comparePasswords(providedPassword, existingUser.password)

  if (arePasswordsEqual === null) {
    res.status(500).json(createErrorResponseObj('Something went wrong on the server'))
    return
  }

  if (!arePasswordsEqual) {
    serverResponse = createErrorResponseObj('Incorrect username or password')
    res.status(400).json(serverResponse)
    return
  }

  const jwtPayload = {
    id: existingUser._id
  }
  const token = createJWT(jwtPayload, JWT_KEY, '1h')

  serverResponse = createSuccessResponseObj({
    token
  })

  res.cookie('token', token, {
    httpOnly: true
  }).json(serverResponse)
}) as RequestHandler)
