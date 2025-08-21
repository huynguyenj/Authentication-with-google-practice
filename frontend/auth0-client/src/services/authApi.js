import { apiClientPrivate, apiClientPublic } from "./apiConfig";

export const authAPI = {
      register: (information) => apiClientPublic.post('/auth/register', information),
      login: (information) => apiClientPublic.post('/auth/login', information),
      loginByGoogle: (credential) => apiClientPublic.post('/auth/login/google', {token: credential}),
      getNewToken: () => apiClientPublic.get('/auth/token'),
      logout: () => apiClientPrivate.post('/auth/logout')
}