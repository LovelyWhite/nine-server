import mongoose from 'mongoose'
import { DATABASE, REDIS_URL } from './src/constants.js'
import { Redis } from 'ioredis'

export const connectDatabase = async () => {
  await mongoose.connect(DATABASE)
}

export const redis = new Redis(REDIS_URL, {
  maxConcurrentQueries: 10,
  maxConnections: 20,
  maxSentinelReconnects: 5,
  enableAutoPipelining: true,
})
