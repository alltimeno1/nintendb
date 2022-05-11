import * as express from 'express'
import { connectCollection } from '../utils/mongo'
import * as requestIp from 'request-ip'
import errorType from '../utils/express'
import { MyBucket } from '../models/bucket'
import { Profile } from 'passport'

const router = express.Router()

// MY 페이지 조회
router.get('/', async (req, res, next) => {
  try {
    const games = await connectCollection('games')
    const buckets = await connectCollection('buckets')
    const status = req.isAuthenticated()

    let myBucket: MyBucket | null
    let profileImg: string = 'static/img/profile_placeholder.png'
    let nickname: string = '익명'

    if (status) {
      const { id: user_id, displayName } = req.user as Profile
      const { _json } = req.user as Types.NaverProfile
      profileImg = _json.profile_image || profileImg
      myBucket = await buckets.findOne({ user_id })
      nickname = displayName
    } else {
      const ip = requestIp.getClientIp(req)

      myBucket = await buckets.findOne({ address: ip })
    }

    const result = await games.find({ name: { $in: myBucket?.list || [] } }).toArray()

    res.render('private', { result, status, profileImg, nickname })
  } catch (error) {
    return next(errorType(error))
  }
})

// MY 페이지 아이템 삭제
router.post('/delete', async (req, res, next) => {
  try {
    const buckets = await connectCollection('buckets')

    if (req.isAuthenticated()) {
      const { id: user_id } = req.user as Profile

      await buckets.updateOne({ user_id }, { $pull: { list: req.body.titleName } })
    } else {
      const ip = requestIp.getClientIp(req)

      await buckets.updateOne({ address: ip }, { $pull: { list: req.body.titleName } })
    }

    res.redirect('/private')
  } catch (error) {
    return next(errorType(error))
  }
})

// MY 페이지 아이템 리셋
router.post('/reset', async (req, res, next) => {
  try {
    const buckets = await connectCollection('buckets')

    if (req.isAuthenticated()) {
      const { id: user_id } = req.user as Profile

      await buckets.updateOne({ user_id }, { $set: { list: [] } })
    } else {
      const ip = requestIp.getClientIp(req)

      await buckets.updateOne({ address: ip }, { $set: { list: [] } })
    }

    res.redirect('/private')
  } catch (error) {
    return next(errorType(error))
  }
})

export = router
