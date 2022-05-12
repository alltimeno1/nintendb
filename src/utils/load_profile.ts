export function loadProfileImg(status: boolean, req: any) {
  let profileImg = 'static/img/profile_placeholder.png'

  if (status) {
    profileImg = req.user._json.profile_image || profileImg
  }

  return profileImg
}

export function loadProfileEmail(status: boolean, req: any) {
  let email = ''

  if (status) {
    email = req.user._json.email || ''
  }

  return email
}
