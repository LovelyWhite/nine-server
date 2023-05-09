import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema({
  content: { type: String, required: true, trim: true },
  color: { type: String, required: true, trim: true },
  sendToId: { type: String, required: true },
  sendFromId: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
})

MessageSchema.index(
  {
    sendFrom: 1,
    sendTo: 1,
    isDeleted: 1,
    createdAt: -1,
    updatedAt: -1,
  },
  { partialFilterExpression: { isDeleted: false } }
)
const MessageModel = new mongoose.model('message', MessageSchema)

export default MessageModel
