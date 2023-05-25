import type { Request, Response } from 'express'
import type { UserRegData } from 'shared/UserSharedTypes'

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

const register = (req: Request, res: Response): void => {
  const regData: UserRegData | null = req.body

  if (!isValidRegData(regData)) {
    res.send({ err: 'Invalid registration data' })
    return
  }

  res.send(req.body)
}

export const UserController = {
  register
}
