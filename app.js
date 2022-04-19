const express = require('express')
const { ObjectId } = require('mongodb')
const { client, connectCollection } = require('./src/js/mongo')

const app = express()

app.use(express.json())
app.use(express.static(__dirname))

app.set('views', 'src/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => res.send('URL should contain /home'))

app.get('/:page', async (req, res, next) => {
  try {
    const { page } = req.params
    const games = await connectCollection('games')

    if (page === 'home' || page === 'rank') {
      const best = await games.find().sort({ rating: -1 }).limit(4).toArray()
      const recent = await games.find().sort({ date: -1 }).limit(4).toArray()
      const sale = await games
        .find()
        .sort({ discountRate: -1 })
        .limit(4)
        .toArray()

      res.render('index', { best, recent, sale })
    } else if (page === 'title') {
      const title = await games.find().toArray()

      res.render('title', { title })
    } else if (page === 'rank' || page === 'login') {
      res.send('준비 중입니다. 조금만 기다려 주세요 :)')
    } else {
      res.render(`${page}`)
    }
  } catch (error) {
    return next(error.message)
  }
})

app.get('/title/:id', async (req, res, next) => {
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

app.post('/title/:id', async (req, res, next) => {
  try {
    const { game_id, id, password, text } = req.body
    const comments = await connectCollection('comments')

    comments.insertOne({
      game_id,
      id,
      password,
      text,
    })
  } catch (error) {
    return next(error.message)
  }
})

app.delete('/title/:id', async (req, res, next) => {
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

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening...')
})

module.exports = app
