const apiBaseUrl = '/api'
const baseUserUrl = apiBaseUrl + '/user'

const userApiPaths = {
    register: baseUserUrl + '/register',
    login: baseUserUrl + '/login'
}

export const apiPaths = {
  user: userApiPaths
}
