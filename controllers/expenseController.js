const User = require('../models/userSchema')
const Record = require('../models/recordSchema')
const Category = require('../models/categorySchema')

const categories = Object.keys(require('../category.json'))

module.exports = expenseController = {
  getIndex: (req, res) => {
    Record
      .find({ userId: req.user._id, deleteAt: null })
      .lean()
      .sort({ date: 'desc' })
      .then((records) => {
        Promise.all(records
          .map((item) => {
            Category
              .findById(item.categoryId)
              .lean()
              .then((category) => { return Object.assign(item, { icon: category.icon }) })
              .catch(err => console.log(err))
          }))

        let totalAmount = 0
        records.forEach(item => totalAmount += item.amount)

        res.render('index', { records, totalAmount, categories })
      })
      .catch(err => console.log(err))
  },
  getCategory: (req, res) => {
    const category = req.params.category
    Category
      .findOne({ name: category })
      .lean()
      .sort({ date: 'desc' })
      .then((category) => {
        Record
          .find({ userId: req.user._id, deleteAt: null, categoryId: category._id })
          .lean()
          .then((records) => {
            Promise.all(records
              .map((item) => {
                Category
                  .findById(item.categoryId)
                  .lean()
                  .then((category) => { return Object.assign(item, { icon: category.icon }) })
                  .catch(err => console.log(err))
              }))

            let totalAmount = 0
            records.forEach(item => totalAmount += item.amount)

            res.render('index', { records, totalAmount, categories })
          })
          .catch(err => console.log(err))

      })
      .catch(err => console.log(err))
  }
}