import express from 'express'
import NoteModel, { checkMoodsVaild } from '../model/note.js'
import { checkSchema, validationResult, matchedData } from 'express-validator'

const router = express.Router()

const checkAdd = checkSchema({
  title: {
    isString: true,
  },
  text: {
    isEmpty: { negated: true },
  },
  moods: {
    isArray: { bail: true },
    custom: { options: checkMoodsVaild },
  },
  isPrivate: {
    isBoolean: true,
    default: false,
  },
  userId: {
    isEmpty: { negated: true },
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
    const note = new NoteModel(data)
    await note.save()
    res.send()
  } catch (e) {
    res.status(400).send(e.message)
  }
})

const checkSearch = checkSchema({
  userId: {
    in: ['query'],
    isEmpty: { negated: true },
  },
})

router.get('/', checkSearch, async (req, res) => {
  try {
    const validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      throw new Error(JSON.stringify(validateResult.array()))
    }
    const query = {
      isDeleted: false,
      $or: [
        { userId: req.query?.userId },
        { $and: [{ isPrivate: false }, { user: { $ne: req.query?.userId } }] },
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
