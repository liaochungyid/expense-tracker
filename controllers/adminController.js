const Record = require('../models/recordSchema')
const Category = require('../models/categorySchema')

const categories = Object.keys(require('../category.json'))

module.exports = adminController = {
  getCreate: (req, res) => {
    res.render('edit', { categories })
  },
  postCreate: (req, res) => {
    const { name, date, category, amount } = req.body
    Category
      .findOne({ name: category })
      .select('_id')
      .lean()
      .then(categoryId => {
        Record
          .create({ name, date, amount, userId: req.user._id, categoryId: categoryId._id, })
          .catch(err => console.log(err))
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  },
  getEdit: (req, res) => {
    Record
      .findOne({ _id: req.params.id, userId: req.user._id })
      .lean()
      .then(record => {
        Category
          .findById(record.categoryId)
          .lean()
          .then(category => {
            res.render('edit', {
              expense: Object.assign(record, {
                category: category.name,
                date: record.date.yyyymmdd('-')
              }),
              categories
            })
          })
      })
      .catch(err => console.log(err))

  },
  putEdit: (req, res) => {
    Record
      .findOne({ _id: req.params.id, userId: req.user._id })
      .then(record => {
        record = Object.assign(record, req.body)
        return record.save()
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  },
  deleteExpense: (req, res) => {
    Record
      .findOne({ _id: req.params.id, userId: req.user._id })
      .then(record => {
        if (record.deleteAt) {
          record.remove()
          return res.redirect('/index/deleteAt')
        } else {
          record = Object.assign(record, { deleteAt: Date.now() })
          record.save()
          res.redirect('/')
        }
      })
      .catch(err => console.log(err))
  }
}
