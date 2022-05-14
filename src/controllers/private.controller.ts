import { Request, Response, NextFunction } from 'express'
import * as requestIp from 'request-ip'
import errorType from '../utils/express'
import { MyBucket } from '../models/bucket'
import { Profile } from 'passport'
import { loadProfileImg } from '../utils/load_profile'
import { findMyBucket, showMyBucket, updateItem, updateItems } from '../services/private.service'

const getPrivate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.isAuthenticated()
    const profileImg = loadProfileImg(status, req)
    let myBucket: MyBucket | null
    let nickname = '익명'

    if (status) {
      const { id: userId, displayName } = req.user as Profile

      myBucket = await findMyBucket(userId)
      nickname = displayName
    } else {
      const ip = <string>requestIp.getClientIp(req)

      myBucket = await findMyBucket(ip)
    }

    const result = await showMyBucket(myBucket)

    res.render('private', { result, status, profileImg, nickname })
  } catch (error) {
    return next(errorType(error))
  }
}

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { titleName } = req.body
    const status = req.isAuthenticated()

    if (status) {
      const { id: userId } = req.user as Profile

      await updateItem(userId, titleName)
    } else {
      const address = <string>requestIp.getClientIp(req)

      await updateItem(address, titleName)
    }

    res.redirect('/private')
  } catch (error) {
    return next(errorType(error))
  }
}

const resetBucket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.isAuthenticated()

    if (status) {
      const { id: userId } = req.user as Profile

      await updateItems(userId)
    } else {
      const address = <string>requestIp.getClientIp(req)

      await updateItems(address)
    }

    res.redirect('/private')
  } catch (error) {
    return next(errorType(error))
  }
}

export { getPrivate, deleteItem, resetBucket }
