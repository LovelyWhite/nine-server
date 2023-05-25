import express from 'express'
import { getUser } from '../engine/user.js'
import randomColor from '../../randomColor.js'
import MessageModel from '../model/message.js'
import { SERVER_BASE_URL } from '../constants.js'
import { sendMessage } from '../engine/wecorp.js'

const router = express.Router()

router.post('/:sendToId/biu', async (req, res) => {
  const sendToId = req.params.sendToId
  const { content } = req.body
  const userId = req.headers.authorization
  try {
    await sendAndSaveMessage(content, userId, sendToId)
    res.send()
  } catch (err) {
    res.status(500).send(err.message)
  }
})

const sendAndSaveMessage = async (content, userId, sendToId) => {
  const openId = getUser(sendToId)
  if (!openId) {
    res.status(400).send('User not found')
    return
  }
  const color = randomColor({
    luminosity: 'bright',
    hue: 'random',
  })
  const message = new MessageModel({
    sendToId,
    sendFromId: userId,
    content,
    color,
  })
  const { _id } = await message.save()
  await sendMessage(
    content,
    sendToId,
    color,
    `${SERVER_BASE_URL}/messages/${_id}`
  )
}

export default router
