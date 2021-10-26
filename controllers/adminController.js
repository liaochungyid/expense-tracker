const User = require('../models/userSchema')
const Record = require('../models/recordSchema')
const Category = require('../models/categorySchema')

module.exports = adminController = {
  getCreate: (req, res) => {
    res.render('edit')
  },
  postCreate: (req, res) => {
    console.log(req.body)
    res.redirect('/')
  },
  getEdit: (req, res) => {
    console.log(req.params.id)
    res.render('edit')
  },
  putEdit: (req, res) => {
    console.log(req.params.id)
    res.redirect('/')
  },
  deleteExpense: (req, res) => {
    console.log(req.params.id)
    res.redirect('/')
  }
}
