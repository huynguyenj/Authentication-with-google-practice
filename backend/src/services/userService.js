import { User } from "@/model/userModel"
import ApiError from "@/utils/errorCustom"
import { StatusCodes } from "http-status-codes"

const profileService = async (userId) => {
      try {
        const user = await User.findById(userId)
        const dataReturn = {
            ...user._doc,
            password: undefined
        }    
        return dataReturn
      } catch (error) {
         throw new ApiError(StatusCodes.BAD_REQUEST, error.message)   
      }
}

export const userService = {
      profileService
}