import { userService } from "@/services/userService"
import { jsonFormReturn } from "@/utils/constants"
import { StatusCodes } from "http-status-codes"

const profileController = async (req, res, next) => {
      try {
        const { id } = req.user 
        const data = await userService.profileService(id)
        res.status(StatusCodes.OK).json(jsonFormReturn(true, 'Get profile success!', {profile: data}))   
      } catch (error) {
        next(error)    
      }
}
export const userController = {
      profileController
}