import express from 'express'
import bodyParser from 'body-parser'
import wx from './router/wx.js'
import user from './router/user.js'

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.use('/wx', wx)
app.use('/user', user)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
