import * as express from 'express'
import { connectCollection } from '../utils/mongo'
import { boardRegExp } from '../utils/regular_expressions'
import errorType from '../utils/express'

const router = express.Router()

router.get('/', (req, res) => res.redirect('/home'))

router.get('/:page', async (req, res, next) => {
  try {
    const { page } = req.params
    const games = await connectCollection('games')
    const status = req.isAuthenticated()

    if (page === 'home') {
      const best = await games.find().sort({ rating: -1 }).limit(4).toArray()
      const recent = await games.find().sort({ date: -1 }).limit(4).toArray()
      const sale = await games.find().sort({ discountRate: -1 }).limit(4).toArray()

      res.render('index', { best, recent, sale, status })
    } else if (page === 'etc') {
      let email: string = ''

      if (status) {
        const { _json } = req.user as Types.NaverProfile
        email = _json.email
      }

      res.render(`${page}`, { status, email })
    } else {
      res.render(`${page}`, { status })
    }
  } catch (error) {
    return next(errorType(error))
  }
})

// 문의하기
router.post('/etc', async (req, res, next) => {
  try {
    const inquery = await connectCollection('inquery')
    const { name, email, message } = req.body
    const validationMsg = boardRegExp('', message, name, '', email)

    if (!validationMsg) {
      await inquery.insertOne({
        name,
        email,
        message,
      })

      res.send(`<script>alert('감사합니다!');location.href='/etc';</script>`)
    } else {
      res.send(`<script>alert('${validationMsg}');location.href='/etc';</script>`)
    }
  } catch (error) {
    return next(errorType(error))
  }
})

export = router
