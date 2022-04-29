const router = require('express').Router()
const { connectCollection } = require('../js/mongo')

router.get('/', (req, res) => res.redirect('/home'))

router.get('/:page', async (req, res, next) => {
  try {
    const { page } = req.params
    const games = await connectCollection('games')
    const status = req.isAuthenticated()

    if (page === 'home') {
      const best = await games.find().sort({ rating: -1 }).limit(4).toArray()
      const recent = await games.find().sort({ date: -1 }).limit(4).toArray()
      const sale = await games
        .find()
        .sort({ discountRate: -1 })
        .limit(4)
        .toArray()

      res.render('index', { best, recent, sale, status })
    } else {
      res.render(`${page}`, { status })
    }
  } catch (error) {
    return next(error.message)
  }
})

module.exports = router
