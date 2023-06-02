import type { Request, Response } from 'express'
import type { UserRegData, UserRegResponse } from 'shared/UserSharedTypes'
import type { ErrorResponse } from 'shared/ServerResponseTypes'
import { User } from '../models/user'

const isErrorResponseObj = (resp: UserRegResponse | null): boolean => {
  if (resp === null) return false
  if ('err' in (resp as ErrorResponse)) return true

  return false
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

const register = async (req: Request, res: Response): Promise<undefined> => {
  const regData: UserRegData | null = req.body

  if (!isValidRegData(regData)) {
    res.send({ err: 'Invalid registration data' })
    return
  }

  const { username } = regData as UserRegData
  let serverResponse: UserRegResponse | null = null

  const existingUser = await User.findOne({ username }).catch(err => {
    console.error('Something went wrong trying to find user with username:', username)
    console.error(err)
    serverResponse = { err: 'Something went wrong with the server' }
  })

  if (isErrorResponseObj(serverResponse)) {
    res.status(500).json(serverResponse)
    return
  }

  if (existingUser !== null) {
    res.json({ err: 'User already exists' })
    return
  }

  res.send(req.body)
}

export const UserController = {
  register
}
