export function loadProfileImg(req: any) {
  const defaultImg = 'static/img/profile_placeholder.png'
  const profileImg = req.user?._json?.profile_image

  return profileImg || defaultImg
}

export function loadProfileEmail(req: any) {
  const email = req.user?._json?.email || ''

  return email
}
