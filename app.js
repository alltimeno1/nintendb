const express = require('express')
const app = express()
const login = require('./dist/routes/login')
const title = require('./dist/routes/title.route')
const forum = require('./dist/routes/forum.route')
const private = require('./dist/routes/private.route')
const etc = require('./dist/routes/etc.route')

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
