import type { UserRegEntry, UserRegResponse } from '../../../../shared/types/UserSharedTypes'

import { apiPaths } from '../../../../shared/apiPaths'
import { post } from '../httpRequestMethods'

export const registerUser = async (data: UserRegEntry):
Promise<UserRegResponse> => {
  return await post(apiPaths.user.register, JSON.stringify(data))
    .then(async res => await res.json())
}
