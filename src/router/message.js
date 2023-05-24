import express from 'express'
import MessageModel from '../model/message.js'
import dayjs from 'dayjs'

const router = express.Router()

router.get('/:id', async (req, res) => {

  const message = await MessageModel.findById(req.params.id).exec()
  const html = `
  <html>
  <head>
    <title>消息</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <p style='color: ${message?.color};'>${message?.content}</p>
    <p style='font-size: 14px;color:#324057'>发送者: ${message?.sendFromId}</p>
    <p style='font-size: 14px;color:#324057'>发送时间: ${dayjs(message?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
  </body>
  </html>
`;
  res.append('content-type', 'text/html;charset=utf-8')
  res.send(html)
})

export default router
