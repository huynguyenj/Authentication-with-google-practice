import axios from "axios";
import { env } from "../config/environment";
import { authAPI } from "./authApi";
import { saveToken } from "../features/authentication/auth-slice";
import { store } from "../store/store";

export const apiClientPrivate = axios.create({
      baseURL: env.API_ENDPOINT,
      withCredentials: true
})
export const apiClientPublic = axios.create({
      baseURL: env.API_ENDPOINT,
      withCredentials: true
})

apiClientPublic.interceptors.response.use((response) => {
      return response.data
}, async (error) => {
     return Promise.reject(error.message)
})

apiClientPrivate.interceptors.request.use((config) => {
      const token = store.getState().token.access_token
      if (token) {
         config.headers.Authorization = `Bearer ${token}`
      }
      return config
}, (error) => {
      return Promise.reject(error.message)
})

apiClientPrivate.interceptors.response.use((response) => {
      return response.data
}, async (error) => {
      const errorRequest = error.config
      // Error when use console.log(error.response)
      // config: {},
      // data: {status: 401, message: 'Token is not provided!'}
      // headers: AxiosHeaders {content-length: '49', content-type: 'application/json; charset=utf-8'}
      // request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: true, upload: XMLHttpRequestUpload, …}
      // status: 401 => this from backend we define error response
      // statusText: "Unauthorized" => this is a status description
      const errorMessage = error?.response?.data?.message 
      const errorStatus = error?.status
      //Check condition when access token expired or missing
      if (errorStatus === 401 && !errorRequest._retry) {
            errorRequest._retry = true
      // Call API refresh token to get new access token
      try {
        const newTokenResponse = await authAPI.getNewToken()
        const newAccessToken = newTokenResponse.data.access_token
        store.dispatch(saveToken(newAccessToken))
      // Update header and retry original request
        errorRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return apiClientPrivate(errorRequest) // retry the request that expired access token but still valid refresh token
      } catch (error) {
        //Catch error when refresh token api throw error in backend
        return Promise.reject(error.message)    
      }
   }
      // If not qualified condition to call refresh token API return Error
      return Promise.reject(errorMessage)
})