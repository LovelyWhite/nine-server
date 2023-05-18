import mongoose from 'mongoose'
import constants from '../constants.js'
const { MOODS } = constants
export const checkMoodsVaild = (value) => {
  const list = value.filter((item) => !Object.keys(MOODS).includes(item))
  return list.length === 0
}

const NoteSchema = mongoose.Schema({
  title: { type: String, trim: true },
  text: { type: String, required: true, trim: true },
  moods: {
    type: [String],
    validate: {
      validator: checkMoodsVaild,
      message: (props) => {
        return `${props.value.filter(
          (item) => !Object.keys(MOODS).includes(item)
        )} 不可用`
      },
    },
  },
  isPrivate: { type: Boolean, default: false },
  refNoteId: { type: mongoose.Types.ObjectId },
  refNote: { type: Object },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
})

NoteSchema.index(
  {
    moods: 1,
    isPrivate: 1,
    userId: 1,
    isDeleted: 1,
    createdAt: -1,
    updatedAt: -1,
  },
  { partialFilterExpression: { isDeleted: false } }
)
NoteSchema.index(
  { refNoteId: 1 },
  { partialFilterExpression: { isDeleted: false } }
)
const NoteModel = new mongoose.model('note', NoteSchema)

export default NoteModel
