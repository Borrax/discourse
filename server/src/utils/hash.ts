import { createHash } from 'crypto'

export const genPassHash = (plainPass: string): string => {
  return createHash('sha256').update(plainPass).digest('hex')
}
