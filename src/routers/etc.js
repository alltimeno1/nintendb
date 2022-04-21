const router = require('express').Router()
const { connectCollection } = require('../js/mongo')

router.get('/', (req, res) => res.send('URL should contain /home'))

router.get('/:page', async (req, res, next) => {
  try {
    const { page } = req.params
    const games = await connectCollection('games')

    if (page === 'home' || page === 'rank') {
      const best = await games.find().sort({ rating: -1 }).limit(4).toArray()
      const recent = await games.find().sort({ date: -1 }).limit(4).toArray()
      const sale = await games
        .find()
        .sort({ discountRate: -1 })
        .limit(4)
        .toArray()

      res.render('index', { best, recent, sale })
    } else if (page === 'login') {
      res.send('준비 중입니다. 조금만 기다려 주세요 :)')
    } else {
      res.render(`${page}`)
    }
  } catch (error) {
    return next(error.message)
  }
})

module.exports = router
