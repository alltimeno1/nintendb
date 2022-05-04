const router = require('express').Router()
const passport = require('passport')
const session = require('express-session')
const NaverStrategy = require('passport-naver').Strategy

require('dotenv').config()

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_PASSWORD,
      callbackURL: process.env.NAVER_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        console.log('profile=')
        console.log(profile)
        // data to be saved in DB
        user = {
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.displayName,
          provider: 'naver',
          naver: profile._json,
        }
        console.log('user=')
        console.log(user)
        return done(null, profile)
      })
    }
  )
)

router.use(
  session({ secret: 'keyboard cat', resave: false, saveUninitialized: false })
)
router.use(passport.initialize())
router.use(passport.session())

// Setting the naver oauth routes
router.get('/login', passport.authenticate('naver', null), function (req, res) {
  console.log('/login failed, stopped')
})

// creates an account if no account of the new user
router.get(
  '/login/callback',
  passport.authenticate('naver', {
    failureRedirect: '/login',
  }),
  function (req, res) {
    res.redirect('/home')
  }
)

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/home')
})

module.exports = router
