const express = require('express')
const { connectCollection } = require('./src/js/mongo')

const app = express()

app.use(express.json())
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: false }))

app.set('views', 'src/views')
app.set('view engine', 'pug')

const title = require('./src/routers/title')
const forum = require('./src/routers/forum')
const etc = require('./src/routers/etc')

app.use('/title', title)
app.use('/forum', forum)
app.use('/', etc)

app.listen(3000, () => {
  console.log('Server is listening...')
})

module.exports = app
