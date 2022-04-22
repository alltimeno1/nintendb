const router = require('express').Router()
const { connectCollection } = require('../js/mongo')
const requestIp = require('request-ip')

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
    const counts = await connectCollection('counts')
    const count = await counts.findOneAndUpdate(
      { name: 'board' },
      { $inc: { count: 1 } }
    )

    await board.insertOne({
      id: count.value.count,
      title,
      nickname,
      password,
      text,
      date: new Date(),
      viewCount: 0,
      recommend: 0,
    })

    res.redirect('forum')
  } catch (error) {
    return next(error.message)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const { post_id, password } = req.body
    const board = await connectCollection('board')
    await board.deleteOne({
      id: parseInt(post_id),
      password: password,
    })
    res.redirect('/forum')
  } catch (error) {
    return next(error.message)
  }
})

router.post('/:id/recommend', async (req, res, next) => {
  try {
    const { id } = req.params
    const { post_id } = req.body
    const ip = requestIp.getClientIp(req)
    const board = await connectCollection('board')

    await board.updateOne(
      { id: parseInt(post_id) },
      { $set: { recommend: [ip] } }
    )

    res.redirect(`/forum/${id}`)
  } catch (error) {
    return next(error.message)
  }
})

module.exports = router
