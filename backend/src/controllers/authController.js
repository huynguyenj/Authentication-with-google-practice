import { authService } from "@/services/authServices.js"
import { COOKIE_OPTION, jsonFormReturn } from "@/utils/constants.js"
import { StatusCodes } from "http-status-codes"

const loginController = async (req, res, next) => {
      try {
        const data = req.body
        const { accessToken, refreshToken } = await authService.loginService(data)
        res.cookie('refreshToken', refreshToken, COOKIE_OPTION)
        res.status(StatusCodes.ACCEPTED).json(jsonFormReturn(true, 'Login success!', {access_token: accessToken})) 
      } catch (error) {
        next(error)
      }
}

const registerController = async (req, res, next) => {
      try {
        const data = req.body
        const responseData = await authService.registerService(data)
        res.status(StatusCodes.CREATED).json(jsonFormReturn(true, 'Register successfully', responseData))
      } catch (error) {
        next(error) 
      }
}

const loginByGoogleController = async (req, res, next) => {
      try {
        const data = req.body
        const { accessToken, refreshToken } = await authService.loginByGoogleService(data)
        res.cookie('refreshToken', refreshToken, COOKIE_OPTION)
        res.status(StatusCodes.OK).json(jsonFormReturn(true, 'Login successfully', {access_token: accessToken}))
      } catch (error) {
        next(error)    
      }
}

const getNewTokenController = async (req, res, next) => {
  try {
    const { id } = req.user
    const token = await authService.getNewTokenService(id)
    res.status(StatusCodes.OK).json(jsonFormReturn(true, 'Get new access token success', {access_token: token}))
  } catch (error) {
    next(error)
  }
}
const logoutController = async (req, res, next) => {
  try {
    const { id } = req.user
    await authService.logoutService(id)
    res.clearCookie('refreshToken', COOKIE_OPTION)
    res.status(StatusCodes.OK).json(jsonFormReturn(true, 'Logout successfully'))
  } catch (error) {
    next(error)
  }
}
export const authController = {
      loginController,
      registerController,
      loginByGoogleController,
      logoutController,
      getNewTokenController
}