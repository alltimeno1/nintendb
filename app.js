const express = require('express')
const { ObjectId } = require('mongodb')
const mongoClient = require('./src/js/mongo')

const app = express()
const _client = mongoClient.connect()

async function getGameCollection(colName) {
  const client = await _client

  return client.db('switch').collection(colName)
}

app.use(express.json())
app.use(express.static(__dirname))

app.set('views', 'src/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => res.send('URL should contain /home'))

app.get('/:page', async (req, res) => {
  try {
    const { page } = req.params
    const games = await getGameCollection('games')

    if (page === 'home') {
      const best = await games.find().sort({ rating: -1 }).limit(4).toArray()
      const recent = await games.find().sort({ date: -1 }).limit(4).toArray()
      const sale = await games.find().sort({ price: 1 }).limit(4).toArray()

      res.render('index', { best, recent, sale })
    } else if (page === 'title') {
      const title = await games.find().toArray()

      res.render('title', { title })
    } else if (page === 'rank' || 'login') {
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
    const games = await getGameCollection('games')
    const comments = await getGameCollection('comments')
    const title = await games.findOne({ _id: ObjectId(id) })
    const comment = await comments.find({ game_id: ObjectId(id) }).toArray()

    if (title) {
      res.render('title_info', { title, comment })
    } else {
      res.status(404).send({
        message: 'There is no title with the id or DB disconnected :(',
      })
    }
  } catch (error) {
    return next(error.message)
  }
})

app.post('/title/:id', async (req, res) => {
  try {
    const { game_id, id, password, text } = req.body
    const comments = await getGameCollection('comments')

    comments.insertOne({
      game_id: ObjectId(game_id),
      name: id,
      password: password,
      text: text,
    })
  } catch (error) {
    return next(error.message)
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening...')
})

module.exports = app
