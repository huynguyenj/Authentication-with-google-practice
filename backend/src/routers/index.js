import express from 'express'
import { Auth_Route } from './auth.js'
import { UserRoute } from './user.js'
const Router = express.Router()

Router.use('/auth', Auth_Route)
Router.use('/user', UserRoute)

export const IndexRoute = Router