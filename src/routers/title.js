const router = require('express').Router()
const { ObjectId } = require('mongodb')
const { connectCollection } = require('../js/mongo')

router.get('', async (req, res, next) => {
  try {
    const games = await connectCollection('games')
    const title = await games.find().toArray()

    res.render('title', { title })
  } catch (error) {
    return next(error.message)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const games = await connectCollection('games')
    const comments = await connectCollection('comments')
    const title = await games.findOne({ name: id })
    const comment = await comments.find({ game_id: id }).toArray()

    if (!title) {
      res.status(404).send({
        message: 'There is no title with the id or DB disconnected :(',
      })
    }

    return res.render('title_info', { title, comment })
  } catch (error) {
    return next(error.message)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const { game_id, name, password, text } = req.body
    const comments = await connectCollection('comments')

    comments.insertOne({
      game_id: decodeURI(game_id),
      name,
      password,
      text,
    })
    res.redirect(`/title/${game_id}`)
  } catch (error) {
    return next(error.message)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id, password } = req.body
    const comments = await connectCollection('comments')
    comments.deleteOne({
      _id: ObjectId(id),
      password: password,
    })
  } catch (error) {
    return next(error.message)
  }
})

module.exports = router
