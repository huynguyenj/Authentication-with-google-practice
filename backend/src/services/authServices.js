import { Token } from "@/model/tokenModel"
import { User } from "@/model/userModel.js"
import ApiError from "@/utils/errorCustom.js"
import { jwtHelper } from "@/utils/jwtHelper"
import { passwordHelper } from "@/utils/passwordHelper.js"
import { StatusCodes } from "http-status-codes"

const loginService = async (data) => {
      try {
        const { username, password } = data
        //Check authentication
        const user = await User.findOne({username: username})
        const isPasswordValid = await passwordHelper.checkPassword(password, user.password)
        if (!user || !isPasswordValid) {
          throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid username or password')
        }
        //Generate token
        const payload = {username: user.username, id: user._id}
        const accessToken = jwtHelper.generateAccessToken(payload)
        const refreshToken = jwtHelper.generateRefreshToken(payload)
      
        const tokenData = {
          access_token: accessToken,
          refresh_token: refreshToken,
        }
        //Save to token collection
        if (user.token) {
          await Token.findOneAndDelete({_id: user.token})  
          const result = await Token.insertOne(tokenData)
          await User.updateOne({_id: user._id}, {$set: {token: result._id}})
        } else {
          const result = await Token.insertOne(tokenData)
          await User.updateOne({_id: user._id}, {$set: {token: result._id}})
        }
        return { accessToken, refreshToken }
      } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.message)    
      }
}

const registerService = async (data) => {
      try {
        const { username, password } = data
        const user = await User.findOne({username: username})
        if (user) throw new Error('This username is already created')
        const hashPassword = await passwordHelper.hashPassword(password)
        const userData = {
            googleId: null,
            username: username,
            password: hashPassword
        }
        const insertData = await User.insertOne(userData)
        return insertData
      } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.message)    
      }
}

const loginByGoogleService = async (data) => {
      try {
        const { token } = data
        const payload = await jwtHelper.verifiedGoogleToken(token)
        const { name, sub } = payload
        let user = await User.findOne({googleId: sub})
        if (!user) {
          const userData = {
          googleId: sub,
          username: name,
          password: null
        }
         user = await User.insertOne(userData)
        }
        
        const payloadToken = {username: user.username, id: user._id}
        const accessToken = jwtHelper.generateAccessToken(payloadToken)
        const refreshToken = jwtHelper.generateRefreshToken(payloadToken)

        const tokenData = {
          access_token: accessToken,
          refresh_token: refreshToken,
        }
         if (user.token) {
          await Token.findOneAndDelete({_id: user.token})  
          const result = await Token.insertOne(tokenData)
          await User.updateOne({_id: user._id}, {$set: {token: result._id}})
        } else {
          const result = await Token.insertOne(tokenData)
          await User.updateOne({_id: user._id}, {$set: {token: result._id}})
        }
        return { accessToken, refreshToken }
      } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.message)    
      }
}

const logoutService = async (userId) => {
  try {
    const user = await User.findById(userId)
    await User.findByIdAndUpdate(userId, {$set: {token: null}})
    await Token.findByIdAndDelete(user.token)
    return
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)    
  }
}

const getNewTokenService = async (userId) => {
  try {
    const user = await User.findById(userId)
    const payloadToken = {username: user.username, id: user._id}
    const newAccessToken = jwtHelper.generateAccessToken(payloadToken)
    await Token.findByIdAndUpdate(user.token, {$set: {access_token: newAccessToken}})
    return newAccessToken
  } catch (error) {
      throw new ApiError(StatusCodes.BAD_REQUEST, error.message)    
  }
}

const removeTokenExpired = async (tokenObj) => {
  await Token.findOneAndUpdate(tokenObj.name, {$set: null})
  return
}

export const authService= {
      loginByGoogleService,
      loginService,
      registerService,
      removeTokenExpired,
      getNewTokenService,
      logoutService
}