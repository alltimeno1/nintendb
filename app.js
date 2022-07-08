const express = require('express')
const { connect } = require('./dist/utils/mongo')
const cors = require('cors')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const PORT = 3000

const app = express()

const login = require('./dist/routes/login')
const title = require('./dist/routes/title.route')
const forum = require('./dist/routes/forum.route')
const private = require('./dist/routes/private.route')
const etc = require('./dist/routes/etc.route')

connect()

app.set('views', 'src/views')
app.set('view engine', 'pug')

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: false }))
app.use(logger('short'))
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/', login)
app.use('/title', title)
app.use('/forum', forum)
app.use('/private', private)
app.use('/', etc)

app.use((req, res) => {
  res.status(404).send('Page Not Found!')
})

app.use((err, req, res) => {
  const { message, status } = err

  return res.status(status || 400).json({ message })
})

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`)
})

module.exports = app
