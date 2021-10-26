const adminController = require('../controllers/adminController.js')
const expenseController = require('../controllers/expenseController.js')
const userController = require('../controllers/userController.js')

module.exports = (app) => {
  app.get('/', expenseController.getIndex)

  app.get('/users/login', userController.getLogin)
  app.post('/users/login', userController.postLogin)
  app.get('/users/register', userController.getRegister)
  app.post('/users/register', userController.postRegister)
  app.get('/users/logout', userController.getLogout)

  app.get('/expenses/create', adminController.getCreate)
  app.post('/', adminController.postCreate)
  app.get('/expenses/:id', adminController.getEdit)
  app.put('/expenses/:id', adminController.putEdit)
  app.delete('/expenses/:id', adminController.deleteExpense)
}