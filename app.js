const express = require('express')
const app = express()
const login = require('./dist/routes/login')
const title = require('./dist/routes/title')
const forum = require('./dist/routes/forum')
const private = require('./dist/routes/private')
const etc = require('./dist/routes/etc')

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
