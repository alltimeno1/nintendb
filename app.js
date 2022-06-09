const express = require('express')
const app = express()
const { connect } = require('./dist/utils/mongo')
const cors = require('cors')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const PORT = 3000

const login = require('./dist/routes/login')
const title = require('./dist/routes/title.route')
const forum = require('./dist/routes/forum.route')
const private = require('./dist/routes/private.route')
const etc = require('./dist/routes/etc.route')

connect()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: false }))
app.use(logger('short'))

app.set('views', 'src/views')
app.set('view engine', 'pug')

app.use('/', login)
app.use('/title', title)
app.use('/forum', forum)
app.use('/private', private)
app.use('/', etc)

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`)
})

module.exports = app
