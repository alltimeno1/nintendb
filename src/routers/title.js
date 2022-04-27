const router = require('express').Router()
const e = require('express')
const { ObjectId } = require('mongodb')
const requestIp = require('request-ip')
const { connectCollection } = require('../js/mongo')
const { boardRegExp } = require('../js/regular_expressions')

// 모든 게임 조회
router.get('', async (req, res, next) => {
  try {
    const games = await connectCollection('games')
    const title = await games.find().toArray()
    const status = req.isAuthenticated()
      ? ['/logout', '로그아웃']
      : ['/login', '로그인/회원가입']

    res.render('title', { title, status })
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

    if (req.isAuthenticated()) {
      res.render('title_info_login', { title, comment })
    } else {
      res.render('title_info', { title, comment })
    }
  } catch (error) {
    return next(error.message)
  }
})

// 찜하기
router.post('/bucket', async (req, res, next) => {
  try {
    const { game_id } = req.body
    const buckets = await connectCollection('buckets')
    if (req.isAuthenticated()) {
      const bucket = await buckets.findOneAndUpdate(
        { id: req.user.id },
        { $addToSet: { list: game_id } }
      )

      if (!bucket.value) {
        await buckets.insertOne({ id: req.user.id, list: [game_id] })
      }
    } else {
      const ip = requestIp.getClientIp(req)
      const bucket = await buckets.findOneAndUpdate(
        { address: ip },
        { $addToSet: { list: game_id } }
      )

      if (!bucket.value) {
        await buckets.insertOne({ address: ip, list: [game_id] })
      }
    }

    res.send(
      `<script>alert('관심 목록에 ${game_id}가 추가되었습니다!');location.href='/title/${game_id}';</script>`
    )
  } catch (error) {
    return next(error.message)
  }
})

// 댓글 등록
router.post('/:id', async (req, res, next) => {
  try {
    const comments = await connectCollection('comments')
    const { game_id, text } = req.body

    if (req.isAuthenticated()) {
      const { displayName, id } = req.user

      await comments.insertOne({
        game_id: decodeURI(game_id),
        id: id,
        name: displayName,
        text: text.replace(/\n/g, '<br>'),
      })

      res.redirect(`/title/${game_id}`)
    } else {
      const { game_id, user_name, password, text } = req.body
      const message = boardRegExp('', text, user_name, password)

      if (!message) {
        await comments.insertOne({
          game_id: decodeURI(game_id),
          name: user_name,
          password,
          text: text.replace(/\n/g, '<br>'),
        })
        res.redirect(`/title/${game_id}`)
      } else {
        res.send(
          `<script>alert('${message}');location.href='/title/${game_id}';</script>`
        )
      }
    }
  } catch (error) {
    return next(error.message)
  }
})

// 댓글 삭제
router.post('/:id/delete', async (req, res, next) => {
  try {
    const { comment_id, password, title_id } = req.body
    const comments = await connectCollection('comments')

    if (req.isAuthenticated()) {
      await comments.deleteOne({
        _id: ObjectId(comment_id),
        id: req.user.id,
      })
    } else {
      await comments.deleteOne({
        _id: ObjectId(comment_id),
        password: password,
      })
    }

    res.redirect(`/title/${title_id}`)
  } catch (error) {
    return next(error.message)
  }
})

module.exports = router
