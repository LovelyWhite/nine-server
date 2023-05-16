import express from 'express'
import { sendMessage } from '../engine/wx.js'
import { getUser } from '../engine/user.js'
import randomColor from '../../randomColor.js'
import constants from '../constants.js'
import MessageModel from '../model/message.js'

const router = express.Router()

const { BASE_URL } = constants
router.post('/:sendToId/biu', async (req, res) => {
  const sendToId = req.params.sendToId
  const { content } = req.body
  const userId = req.headers.authorization
  const openId = getUser(sendToId)
  if (!openId) {
    res.status(400).send('User not found')
    return
  }
  try {
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
    await sendMessage(content, openId, color, `${BASE_URL}/messages/${_id}`)
    res.send()
  } catch (err) {
    res.status(500).send(err.message)
  }
})

export default router
