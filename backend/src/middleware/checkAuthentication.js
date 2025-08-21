import { Token } from "@/model/tokenModel"
import ApiError from "@/utils/errorCustom"
import { jwtHelper } from "@/utils/jwtHelper.js"
import { StatusCodes } from "http-status-codes"

const checkToken = async (req, res, next) => {
      try {
           const authHeader = req.headers.authorization
           if (!authHeader) throw new ApiError(StatusCodes.UNAUTHORIZED,'Token is not provided!')
            const token = authHeader.split(' ')[1]
            const isTokenDBExisted = await Token.findOne({access_token: token})
            if (!isTokenDBExisted) throw new ApiError(StatusCodes.UNAUTHORIZED,'This token already invalid!')
            const verified = await jwtHelper.verifiedToken({name: 'access_token', token: token  })
            req.user = verified           
            next()
      } catch (error) {
            next(error)
      }
}

const checkRefreshToken = async (req, res, next) => {
      try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) throw new ApiError(StatusCodes.UNAUTHORIZED,'Refresh token is not provider!')
        const verified = await jwtHelper.verifiedToken({name: 'refresh_token', token: refreshToken})
        req.user = verified
        next()
      } catch (error) {
        next(error)
      }
}

export const authenticationMiddleware = {
      checkToken,
      checkRefreshToken
}