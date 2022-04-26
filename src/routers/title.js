const router = require('express').Router()
const { ObjectId } = require('mongodb')
const requestIp = require('request-ip')
const { connectCollection } = require('../js/mongo')
const { boardRegExp } = require('../js/regular_expressions')

// 모든 게임 조회
router.get('', async (req, res, next) => {
  try {
    const games = await connectCollection('games')
    const title = await games.find().toArray()

    res.render('title', { title })
  } catch (error) {
    return next(error.message)
  }
})

// 게임 정보 조회
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const games = await connectCollection('games')
    const comments = await connectCollection('comments')
    const title = await games.findOne({ name: id })
    const comment = await comments.find({ game_id: id }).toArray()

    if (!title) {
      res.status(404).send({
        message: 'There is no title with the id or DB disconnected :(',
      })
    }

    return res.render('title_info', { title, comment })
  } catch (error) {
    return next(error.message)
  }
})

// 찜하기
router.post('/bucket', async (req, res, next) => {
  try {
    const { game_id } = req.body
    const ip = requestIp.getClientIp(req)
    const buckets = await connectCollection('buckets')

    const bucket = await buckets.findOneAndUpdate(
      { address: ip },
      { $addToSet: { list: game_id } }
    )

    if (!bucket.value) {
      await buckets.insertOne({ address: ip, list: [game_id] })
    }

    res.send(
      `<script>alert('MY에 ${game_id}가 추가되었습니다!');location.href='/title/${game_id}';</script>`
    )
  } catch (error) {
    return next(error.message)
  }
})

// 댓글 등록
router.post('/:id', async (req, res, next) => {
  try {
    const { game_id, name, password, text } = req.body
    const comments = await connectCollection('comments')
    const message = boardRegExp('', text, name, password)

    if (!message) {
      comments.insertOne({
        game_id: decodeURI(game_id),
        name,
        password,
        text: text.replace(/\n/g, '<br>'),
      })
      res.redirect(`/title/${game_id}`)
    } else {
      res.send(
        `<script>alert('${message}');location.href='/title/${game_id}';</script>`
      )
    }
  } catch (error) {
    return next(error.message)
  }
})

// 댓글 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    const { comment_id, password } = req.body
    const comments = await connectCollection('comments')

    await comments.deleteOne({
      _id: ObjectId(comment_id),
      password: password,
    })
  } catch (error) {
    return next(error.message)
  }
})

module.exports = router
