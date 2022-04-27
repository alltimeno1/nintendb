const express = require('express')
const app = express()
const login = require('./src/routers/login')
const title = require('./src/routers/title')
const forum = require('./src/routers/forum')
const private = require('./src/routers/private')
const etc = require('./src/routers/etc')

app.use(express.json())
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: false }))

app.set('views', 'src/views')
app.set('view engine', 'pug')

app.use('/', login)
app.use('/title', title)
app.use('/forum', forum)
app.use('/private', private)
app.use('/', etc)

app.listen(3000, () => {
  console.log('Server is listening...')
})

module.exports = app
