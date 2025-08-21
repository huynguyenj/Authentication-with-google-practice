import { apiClientPrivate } from "./apiConfig";

export const profileApi = {
      getProfile: () => apiClientPrivate.get('/user/profile')
}