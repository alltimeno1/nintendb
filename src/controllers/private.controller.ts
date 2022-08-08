import { Request, Response, NextFunction } from 'express'
import * as requestIp from 'request-ip'
import { Profile } from 'passport'
import * as Private from '../services/private.service'

// MY 페이지 조회
export const readPrivate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, profileImg } = res.locals.user
    let myBucket: Types.MyBucket | null
    let nickname = '익명'

    if (status) {
      const { id: userId, displayName } = req.user as Profile

      myBucket = await Private.findMyBucket(userId)
      nickname = displayName
    } else {
      const ip = requestIp.getClientIp(req) as string

      myBucket = await Private.findMyBucket(ip)
    }

    const bucket = await Private.findBucketList(myBucket)

    return res.render('private', { bucket, status, profileImg, nickname })
  } catch (error) {
    return next(error)
  }
}

// MY 페이지 아이템 삭제
export const updateBucket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { titleName } = req.body
    const { status } = res.locals.user

    if (status) {
      const { id: userId } = req.user as Profile

      await Private.updateItem(userId, titleName)
    } else {
      const address = requestIp.getClientIp(req) as string

      await Private.updateItem(address, titleName)
    }

    return res.redirect('/private')
  } catch (error) {
    return next(error)
  }
}

// MY 페이지 아이템 리셋
export const deleteBucket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = res.locals.user

    if (status) {
      const { id: userId } = req.user as Profile

      await Private.deleteItems(userId)
    } else {
      const address = requestIp.getClientIp(req) as string

      await Private.deleteItems(address)
    }

    return res.end()
  } catch (error) {
    return next(error)
  }
}
