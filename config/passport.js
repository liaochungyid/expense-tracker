const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userSchema')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, (req, email, password, cb) => {
  User.findOne({ email })
    .then(user => {
      if (!user) return cb(null, false, req.flash('warning_msg', '此 Email 沒有註冊。'))

      if (user.password === password) return cb(null, user)

      return cb(null, false, req.flash('warning_msg', 'Email 或 密碼 錯誤。'))
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