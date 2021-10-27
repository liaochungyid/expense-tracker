const adminController = require('../controllers/adminController.js')
const expenseController = require('../controllers/expenseController.js')
const userController = require('../controllers/userController.js')

module.exports = (app, passport) => {
  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()

    req.flash('warning_msg', '請先登入才能使用！')
    res.redirect('/users/login')
  }

  app.get('/', authenticated, expenseController.getIndex)
  app.get('/index/:category', authenticated, expenseController.getCategory)

  app.get('/users/login', userController.getLogin)
  app.post('/users/login', passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureflash: true
  }), userController.postLogin)
  app.get('/users/register', userController.getRegister)
  app.post('/users/register', userController.postRegister)
  app.get('/users/logout', userController.getLogout)

  app.get('/expenses/create', authenticated, adminController.getCreate)
  app.post('/', authenticated, adminController.postCreate)
  app.get('/expenses/:id', authenticated, adminController.getEdit)
  app.put('/expenses/:id', authenticated, adminController.putEdit)
  app.delete('/expenses/:id', authenticated, adminController.deleteExpense)

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/users/login' }), userController.postLogin)
}