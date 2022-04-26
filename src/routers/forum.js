const router = require('express').Router()
const { connectCollection } = require('../js/mongo')
const requestIp = require('request-ip')
const { boardRegExp } = require('../js/regular_expressions')

// 게시판 조회
router.get('', async (req, res, next) => {
  try {
    const board = await connectCollection('board')
    const post = await board.find().sort({ id: -1 }).toArray()

    res.render('forum', { post })
  } catch (error) {
    return next(error.message)
  }
})

// 게시판 조회
router.get('/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const board = await connectCollection('board')
    const post = await board.findOne({ id: parseInt(id) })

    res.render('update_form', { post })
  } catch (error) {
    return next(error.message)
  }
})

// 게시글 조회
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const board = await connectCollection('board')

    await board.updateOne({ id: parseInt(id) }, { $inc: { viewCount: 1 } })

    const post = await board.findOne({ id: parseInt(id) })

    if (!post) {
      res.status(404).send({
        message: 'There is no post with the id or DB disconnected :(',
      })
    }

    return res.render('post', { post })
  } catch (error) {
    return next(error.message)
  }
})

// 게시글 등록
router.post('', async (req, res, next) => {
  try {
    const { title, nickname, password, text } = req.body
    const board = await connectCollection('board')
    const counts = await connectCollection('counts')
    const postNum = await counts.findOneAndUpdate(
      { name: 'board' },
      { $inc: { count: 1 } }
    )
    const message = boardRegExp(title, '', nickname, password)

    if (!message && text) {
      await board.insertOne({
        id: postNum.value.count,
        title,
        nickname,
        password,
        text: text.replace(/\n/g, '<br>'),
        date: new Date(),
        viewCount: 0,
        recommend: [],
      })

      res.redirect('forum')
    } else {
      res.send(`<script>alert('${message}');location.href='/form';</script>`)
    }
  } catch (error) {
    return next(error.message)
  }
})

// 게시글 삭제
router.post('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { post_id, password } = req.body
    const board = await connectCollection('board')

    const result = await board.deleteOne({
      id: parseInt(post_id),
      password: password,
    })

    if (result.deletedCount) {
      res.redirect('/forum')
    } else {
      res.send(
        `<script>alert('비밀번호를 정확히 입력해주세요!.');location.href='/forum/${id}';</script>`
      )
    }
  } catch (error) {
    return next(error.message)
  }
})

// 게시글 수정
router.post('/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, nickname, password, text } = req.body
    const board = await connectCollection('board')

    const result = await board.findOneAndUpdate(
      { id: parseInt(id), password },
      { $set: { title, nickname, text } }
    )
    console.log(result)
    if (result.value) {
      res.redirect(`/forum/${id}`)
    } else {
      res.send(
        `<script>alert('비밀번호를 정확히 입력해주세요!.');location.href='/forum/update/${id}';</script>`
      )
    }
  } catch (error) {
    return next(error.message)
  }
})

// 게시글 추천
router.post('/:id/recommend', async (req, res, next) => {
  try {
    const { id } = req.params
    const { post_id } = req.body
    const ip = requestIp.getClientIp(req)
    const board = await connectCollection('board')

    await board.updateOne(
      { id: parseInt(post_id) },
      { $addToSet: { recommend: ip } }
    )

    res.redirect(`/forum/${id}`)
  } catch (error) {
    return next(error.message)
  }
})

module.exports = router
