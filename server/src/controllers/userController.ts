import type { Request, Response } from 'express'
import type { UserRegData } from 'shared/UserSharedTypes'
import { User } from '../models/user'

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

const register = async (req: Request, res: Response) => {
  const regData: UserRegData | null = req.body

  if (!isValidRegData(regData)) {
    res.send({ err: 'Invalid registration data' })
    return
  }

  const { username } = regData as UserRegData

  const existingUser = await User.findOne({ username })

  if (existingUser !== null) {
    res.json({ err: 'User already exists' })
    return
  }

  res.send(req.body)
}

export const UserController = {
  register
}
