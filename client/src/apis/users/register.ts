import type { UserRegEntry } from '../../../../shared/types/UserSharedTypes'

import { apiPaths } from '../../../../shared/apiPaths'
import { post } from '../httpRequestMethods'
import { UserRegResponse } from '../../../../shared/types/UserSharedTypes'

export const registerUser = async (data: UserRegEntry):
  Promise<UserRegResponse> => {
    return await post(apiPaths.user.register, JSON.stringify(data))
              .then(res => res.json())
}
