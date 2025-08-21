import { env } from '@/configs/environments.js'
import { authService } from '@/services/authServices'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import ApiError from './errorCustom'
import { StatusCodes } from 'http-status-codes'
const TIME_ACCESS_TOKEN = '2h'
const TIME_REFRESH_TOKEN = '2d'

export const generateAccessToken = (information) => {
      const token = jwt.sign(information, env.JWT_SECRET, { expiresIn: TIME_ACCESS_TOKEN } )
      return token
}

export const generateRefreshToken = (information) => {
      const token = jwt.sign(information, env.JWT_SECRET, { expiresIn: TIME_REFRESH_TOKEN } )
      return token
}

export const decodeToken = async (token) => {
      try {
            const decoded = jwt.decode(token)
            return decoded
      } catch (error) {
            throw new Error(error)
      }
}

export const verifiedToken = async (tokenObj) => {
      try {
            const verified = jwt.verify(tokenObj.token, env.JWT_SECRET)
            return verified
      } catch (error) {
            if (error.name === 'TokenExpiredError') {
                  await authService.removeTokenExpired(tokenObj)
                  throw new ApiError(StatusCodes.UNAUTHORIZED,'TOKEN_EXPIRED')
            } else {
                  throw new ApiError(StatusCodes.UNAUTHORIZED,'Invalid token')
            }
      }
}

export const verifiedGoogleToken= async (token) => {
        try {
            const client = new OAuth2Client(env.GOOGLE_CLIENT_ID)
            const ticket = await client.verifyIdToken({
                  idToken: token,
                  audience: env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()
            return payload
      } catch (error) {
           throw new Error(error)
      }
}
export const jwtHelper = {
      generateAccessToken,
      generateRefreshToken,
      decodeToken,
      verifiedGoogleToken,
      verifiedToken
}