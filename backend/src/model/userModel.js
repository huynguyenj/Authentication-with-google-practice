import mongoose from "mongoose"
const schema = mongoose.Schema
const userSchema = new schema({
    googleId: {
        type: String,
    },
    username: {
        type: String, 
        required: true,
        unique: true
   },
    password: {
        type: String,
    },
    avatar: {
        type: String
    },
    token: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'token',
    }
})
export const User = mongoose.model('user', userSchema)

