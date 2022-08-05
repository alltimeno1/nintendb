import { Response, NextFunction } from 'express'

/* eslint-disable no-underscore-dangle */
function getUserInfo(req: Types.LoginRequest, res: Response, next: NextFunction) {
  const status = req.isAuthenticated()
  const profileImg = req.user?._json?.profile_image || 'static/img/profile_placeholder.png'
  const email = req.user?._json?.email || ''

  res.locals.user = { status, profileImg, email }
  next()
}

export = getUserInfo
