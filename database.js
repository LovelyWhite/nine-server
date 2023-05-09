import mongoose from 'mongoose'
import constants from './src/constants.js'

export const connectDatabase = async () => {
  await mongoose.connect(constants.DATABASE)
}
