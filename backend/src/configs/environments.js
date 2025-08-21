import 'dotenv/config'
export const env = {
      PORT: process.env.PORT,
      MONGO_URI: process.env.MONGO_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      JWKS_URI: process.env.JWKS_URI,
      SALT_HASH: process.env.SALT_HASH
}
