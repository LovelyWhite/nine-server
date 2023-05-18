import express from 'express'
import NoteModel, { checkMoodsVaild } from '../model/note.js'
import { checkSchema, validationResult, matchedData } from 'express-validator'
import mongoose from 'mongoose'

const router = express.Router()

const checkAdd = checkSchema({
  title: {
    optional: true,
    isString: true,
  },
  text: {
    isEmpty: { negated: true },
  },
  moods: {
    isArray: { bail: true },
    custom: { options: checkMoodsVaild },
  },
  refNoteId: {
    optional: true,
    custom: { options: (id) => mongoose.isObjectIdOrHexString(id) },
  },
  isPrivate: {
    isBoolean: true,
    default: false,
  },
})

router.post('/', checkAdd, async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    res.status(400).send(result)
    return
  }
  try {
    const data = matchedData(req)
    data.userId = req.headers.authorization
    if (data.refNoteId) {
      const refNote = await NoteModel.findById(data.refNoteId).exec()
      if (!refNote) {
        throw new Error(`引用记录不存在~`)
      }
      data.refNote = refNote
    }
    const note = new NoteModel(data)
    await note.save()
    res.send()
  } catch (e) {
    res.status(400).send(e.message)
  }
})

router.post('/:id/private', async (req, res) => {
  const noteId = req.params.id
  try {
    const { isPrivate } =
      (await NoteModel.findById(noteId, 'isPrivate').exec()) || {}
    const note = await NoteModel.findByIdAndUpdate(
      noteId,
      { $set: { isPrivate: !isPrivate } },
      { new: true }
    )
    res.send({
      isPrivate: note.isPrivate,
    })
  } catch (e) {
    res.status(400).send(e?.message)
  }
})

router.get('/', async (req, res) => {
  try {
    const userId = req.headers.authorization
    const query = {
      isDeleted: false,
      $or: [
        { userId },
        { $and: [{ isPrivate: false }, { userId: { $ne: userId } }] },
      ],
    }
    if (req.query.mood) {
      query.moods = req.query?.mood
    }
    const page = parseInt(req.query.page || '1', 10)
    const perPage = parseInt(req.query.perPage || '20', 10)
    const total = await NoteModel.count(query)
    const notes = await NoteModel.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ _id: -1 })
    res.send({
      page: query.page,
      total: total,
      perPage: query.perPage,
      items: notes,
    })
  } catch (e) {
    res.status(400).send(e?.message)
  }
})

router.delete('/:id', async (req, res) => {
  const noteId = req.params.id
  try {
    await NoteModel.findByIdAndUpdate(noteId, {
      isDeleted: false,
    })
    res.send()
  } catch (e) {
    res.status(400).send(e?.message)
  }
})

export default router
