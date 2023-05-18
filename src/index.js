import express from 'express'
import bodyParser from 'body-parser'
import wx from './router/wx.js'
import user from './router/user.js'
import note from './router/note.js'
import message from './router/message.js'
import { connectDatabase } from '../database.js'
import { getUser } from './engine/user.js'

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Nine Server is running')
})
app.use((req, res, next) => {
  if (/\/messages\/\w+/.test(req.path)) {
    next()
    return
  }
  const userId = req.headers.authorization
  if (!userId) {
    res.status(400).send('权限验证失败：未设置用户 ID')
    return
  }
  if (!getUser(userId)) {
    res.status(400).send('权限验证失败：用户 ID 不存在')
    return
  }
  next()
})
app.use('/wx', wx)
app.use('/users', user)
app.use('/notes', note)
app.use('/messages', message)

await connectDatabase()

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
