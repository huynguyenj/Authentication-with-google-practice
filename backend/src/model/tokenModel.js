import mongoose from "mongoose"
const schema = mongoose.Schema
const tokenSchema = new schema({
    access_token: {
        type: String, 
        required: true
   },
    refresh_token: {
        type: String,
        require: true
    },
}, {timestamps: true,})
export const Token = mongoose.model('token', tokenSchema)

