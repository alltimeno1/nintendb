import { Request, Response, NextFunction } from 'express'
import * as requestIp from 'request-ip'
import { Profile } from 'passport'
import { loadProfileImg } from '../utils/load_profile'
import { findMyBucket, findBucketList, updateItem, deleteItems } from '../services/private.service'

// MY 페이지 조회
const readPrivate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.isAuthenticated()
    const profileImg = loadProfileImg(status, req)
    let myBucket: Types.MyBucket | null
    let nickname = '익명'

    if (status) {
      const { id: userId, displayName } = req.user as Profile

      myBucket = await findMyBucket(userId)
      nickname = displayName
    } else {
      const ip = requestIp.getClientIp(req) as string

      myBucket = await findMyBucket(ip)
    }

    const result = await findBucketList(myBucket)

    return res.render('private', { result, status, profileImg, nickname })
  } catch (error) {
    return next(error)
  }
}

// MY 페이지 아이템 삭제
const updateBucket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { titleName } = req.body
    const status = req.isAuthenticated()

    if (status) {
      const { id: userId } = req.user as Profile

      await updateItem(userId, titleName)
    } else {
      const address = requestIp.getClientIp(req) as string

      await updateItem(address, titleName)
    }

    return res.redirect('/private')
  } catch (error) {
    return next(error)
  }
}

// MY 페이지 아이템 리셋
const deleteBucket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.isAuthenticated()

    if (status) {
      const { id: userId } = req.user as Profile

      await deleteItems(userId)
    } else {
      const address = requestIp.getClientIp(req) as string

      await deleteItems(address)
    }

    return res.redirect('/private')
  } catch (error) {
    return next(error)
  }
}

export { readPrivate, updateBucket, deleteBucket }
