import { userController } from '@/controllers/userController'
import { authenticationMiddleware } from '@/middleware/checkAuthentication'
import express from 'express'
const Router = express.Router()

Router.route('/profile')
      .get(authenticationMiddleware.checkToken, userController.profileController)

export const UserRoute = Router