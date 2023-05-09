import express from 'express'
import SHA1 from 'crypto-js/sha1.js'

const router = express.Router()

router.get('/', (req, res) => {
  let signature = req.query['signature']
  let echostr = req.query['echostr']
  let timestamp = req.query['timestamp']
  let nonce = req.query['nonce']
  if (!(signature && echostr && timestamp && nonce)) {
    return
  }
  let list = [access_token, timestamp, nonce]
  let shastring = SHA1(list.sort().join('')).toString()
  if (signature === shastring) {
    res.send(echostr)
  }
})

export default router
