import mongoose from "mongoose"
import { env } from "./environments.js"

export const connectMongo = async () => {
      try {
            await mongoose.connect(env.MONGO_URI, {})
            console.log('Connect to mongoDB success!')
      } catch (error) {
            throw new Error('Connect fail!')
      }
}

export const closeMongoConnect = async () => {
      await mongoose.disconnect()
      console.log('Close connection to mongoDB')
}