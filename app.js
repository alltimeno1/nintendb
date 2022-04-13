const express = require('express')
const app = express()
const db = require('./src/db/models/index')
const { Title } = db

app.use(express.json())
app.use(express.static(__dirname))

app.set('views', 'src/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => res.send('URL should contain /home'))

app.get('/:page', async (req, res) => {
  const { page } = req.params
  if (page === 'home') {
    const title = await Title.findAll()
    res.render('index', { title })
  } else if (page === 'title') {
    const title = await Title.findAll()
    res.render('title', { title })
  } else if (page === 'rank') {
    res.send('준비 중입니다. 조금만 기다려 주세요 :)')
  } else {
    res.sendFile(__dirname + `/src/views/${page}.html`)
  }
})

app.get('/title/:id', async (req, res) => {
  const { id } = req.params
  const title = await Title.findOne({ where: { id } })

  if (title) {
    const { name, image, date, rating, price, tag } = title

    res.render('title_info', {
      name,
      image,
      date,
      rating,
      price,
      tag,
    })
  } else {
    res
      .status(404)
      .send({ message: 'There is no title with the id or DB disconnected :(' })
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening...')
})

module.exports = app
