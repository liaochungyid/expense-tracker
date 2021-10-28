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
              .then((category) => { return Object.assign(item, { icon: category.icon, date: item.date.yyyymmdd('/') }) })
              .catch(err => console.log(err))
          }))

        let totalAmount = 0
        records.forEach(item => totalAmount += item.amount)

        res.render('index', { records, totalAmount, categories })
      })
      .catch(err => console.log(err))
  },
  getDeleted: async (req, res) => {
    await Record
      .find({ userId: req.user._id, deleteAt: { $ne: null } })
      .lean()
      .sort({ deleteAt: 'desc' })
      .then((records) => {
        let totalAmount = 0
        let warning_msg
        if (records.length) {
          warning_msg = '刪除列表中，再次刪除會移除資料庫資料，請小心操作。'

          records.forEach(item => totalAmount += item.amount)

          Promise.all(records
            .map((item) => {
              Category
                .findById(item.categoryId)
                .lean()
                .then((category) => {
                  return Object.assign(item, {
                    icon: category.icon,
                    date: item.date.yyyymmdd('/')
                  })
                })
                .catch(err => console.log(err))
            }))
        } else {
          warning_msg = '無刪除項目。'
        }
        res.render('index', { records, totalAmount, categories, warning_msg })
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
                  .then((category) => { return Object.assign(item, { icon: category.icon, date: item.date.yyyymmdd('/') }) })
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