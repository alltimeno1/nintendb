const router = require('express').Router()
const { connectCollection } = require('../js/mongo')

router.get('', async (req, res, next) => {
  try {
    const board = await connectCollection('board')
    const post = await board.find().sort({ id: -1 }).toArray()

    res.render('forum', { post })
  } catch (error) {
    return next(error.message)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const board = await connectCollection('board')

    await board.updateOne({ id: parseInt(id) }, { $inc: { viewCount: 1 } })

    const post = await board.findOne({ id: parseInt(id) })

    if (!post) {
      res.status(404).send({
        message: 'There is no post with the id or DB disconnected :(',
      })
    }

    return res.render('post', { post })
  } catch (error) {
    return next(error.message)
  }
})

router.post('', async (req, res, next) => {
  try {
    const { title, nickname, password, text } = req.body
    const board = await connectCollection('board')
    const colLen = await board.countDocuments()
    const today = new Date()

    await board.insertOne({
      id: colLen + 1,
      title,
      nickname,
      password,
      text,
      date: today,
      viewCount: 0,
      recommend: 0,
    })

    res.redirect('forum')
  } catch (error) {
    return next(error.message)
  }
})

module.exports = router
