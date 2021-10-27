const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FackbookStrategy = require('passport-facebook').Strategy
const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, (req, email, password, cb) => {
  User.findOne({ email })
    .then(user => {
      if (!user) return cb(null, false, req.flash('warning_msg', '此 Email 沒有註冊。'))

      return bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) return cb(null, user)
          return cb(null, false, req.flash('warning_msg', 'Email 或 密碼 錯誤。'))
        })
    })
}))

// 設定facebook登入策略
passport.use(new FackbookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['email', 'displayName']
}, (accessToken, refreshToken, profile, cb) => {
  const { name, email } = profile._json
  User.findOne({ email })
    .then(user => {
      if (user) return cb(null, user)
      const randomPassword = Math.random().toString(36).slice(-8)
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(randomPassword, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(user => cb(null, user))
        .catch(err => console.log(err))
    })
}))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .lean()
    .then(user => cb(null, user))
    .catch(err => cb(err))
})

module.exports = passport