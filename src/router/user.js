import express from 'express'
import { sendMessage } from '../service/wx.js'
import constants from '../constants.js'

const router = express.Router()

const { USERLIST } = constants

router.post('/:userId/biu', async (req, res) => {
    const userId = req.params.userId
    const message = req.body.message
    if (Object.keys(USERLIST).indexOf(userId) === -1) {
        res.status(400).send('User not found')
        return
    }
    const openId = USERLIST[userId]
    try {
        await sendMessage(message, openId)
        res.send('Success')
    } catch (err) {
        res.status(500).send(err.message)
    }
})

export default router
