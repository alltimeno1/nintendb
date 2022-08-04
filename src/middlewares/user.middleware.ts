import { Request, Response, NextFunction } from 'express'
import { loadProfileEmail, loadProfileImg } from '../utils/load_profile'

export function getUserInfo(req: Request, res: Response, next: NextFunction) {
  const status = req.isAuthenticated()
  const profileImg = loadProfileImg(req)
  const email = loadProfileEmail(req)

  res.locals.user = { status, profileImg, email }
  next()
}
