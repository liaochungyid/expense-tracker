const User = require('../models/userSchema')

module.exports = userController = {
  getLogin: (req, res) => {
    res.render('login')
  },
  postLogin: (req, res) => {
    res.redirect('/')
  },
  getLogout: (req, res) => {
    req.logout()
    req.flash('success_msg', '你已成功登出')
    res.redirect('/users/login')
  },
  getRegister: (req, res) => {
    res.render('register')
  },
  postRegister: (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    User.findOne({ email })
      .then(user => {
        req.flash('name', name)
        req.flash('email', email)

        if (user) {
          req.flash('warning_msg', '這個Email已經註冊過了。')
          return res.redirect('/users/register')
        }

        if (password !== confirmPassword) {
          req.flash('warning_msg', '兩次密碼不相同。')
          return res.redirect('/users/register')
        }

        return User
          .create({ name, email, password })
          .then(() => {
            req.flash('success_msg', '成功完成註冊。')
            res.redirect('/users/login')
          })

      })
      .catch(err => console.log(err))
  }
}