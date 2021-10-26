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

    console.log(req.body)

    req.flash('註冊成功！')
    req.flash('email', email)
    res.redirect('/users/login')
  }
}