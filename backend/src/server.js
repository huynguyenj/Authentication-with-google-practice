import { env } from './configs/environments.js'
import cors from 'cors'
import express from 'express'
import { closeMongoConnect, connectMongo } from './configs/mongoDB.js'
import AsyncExitHook from 'async-exit-hook'
import { errorMiddleware } from './controllers/errorHandle.js'
import { IndexRoute } from './routers/index.js'
import cookieParser from 'cookie-parser'
const PORT = env.PORT
const START_APP = async () => {
      const app = express()
      app.use(express.json())
      app.use(cors({ origin: "http://localhost:5173", credentials: true}))
      app.use(cookieParser())
      app.use('/', IndexRoute)
      app.use(errorMiddleware)
      app.listen(PORT, () => {
            console.log(`Server is running at PORT: ${PORT}`)
      })
      AsyncExitHook(() => {
            closeMongoConnect()
      })
}

(async()=> {
      try {
        await connectMongo()
        START_APP()
      } catch (error) {
        console.log(error)
        process.exit(0)    
      }
})()