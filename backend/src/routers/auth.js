import { authController } from '@/controllers/authController.js'
import { authenticationMiddleware } from '@/middleware/checkAuthentication'
import express from 'express'
const Router = express.Router()

Router.route('/login')
      .post(authController.loginController)
Router.route('/logout')
      .post(authenticationMiddleware.checkToken, authController.logoutController)
Router.route('/login/google')
      .post(authController.loginByGoogleController)
Router.route('/register')
      .post(authController.registerController)
Router.route('/token')
      .get(authenticationMiddleware.checkRefreshToken, authController.getNewTokenController)
export const Auth_Route = Router