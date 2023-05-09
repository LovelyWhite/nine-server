import express from 'express'
import MessageModel from '../model/message.js'
import dayjs from 'dayjs'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const message = await MessageModel.findById(req.params.id).exec()
  res.append('content-type', 'text/html;charset=utf-8')
    .write(`<span style="color:${message?.color}">${
    message?.content
  }</span><br/><span style="font-size: 14px;color:#324057">发送者: ${
    message?.sendFromId
  }<br/>
发送时间: ${dayjs(message?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
  `)
  res.send()
})

export default router
