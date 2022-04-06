const express = require('express')
const app = express()
const db = require('./models/index')
const { Title } = db

app.use(express.json())
app.use(express.static(__dirname))

app.get('/', (req, res) => res.send('URL should contain /home'))

app.get('/home', async (req, res) => {
  res.sendFile(__dirname + '/html/index.html')
})

app.get('/rank', async (req, res) => {
  res.send('아직 준비 중입니다. 조금만 기다려 주세요 :(')
})

app.get('/:page', async (req, res) => {
  const { page } = req.params
  res.sendFile(__dirname + `/html/${page}.html`)
})

app.get('/title/:id', async (req, res) => {
  const { id } = req.params
  const title = await Title.findOne({ where: { id } })

  if (title) {
    res.send(title)
  } else {
    res
      .status(404)
      .send({ message: 'There is no title with the id or DB error :(' })
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening...')
})
