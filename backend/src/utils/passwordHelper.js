import { env } from '@/configs/environments.js'
import bcrypt from 'bcrypt'
const hashPassword = async (password) => {
      return await bcrypt.hash(password, parseInt(env.SALT_HASH))
}

const checkPassword = async (password, passwordDB) => {
      return await bcrypt.compare(password, passwordDB)
}

export const passwordHelper = {
      hashPassword,
      checkPassword
}