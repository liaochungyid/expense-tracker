if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const mongoose = require('mongoose')
const Category = require('../categorySchema')
const db = require('../../config/mongoose')
const CATEGORY = require('../../category.json')

db.once('open', (err, resp) => {
  Promise.all(Object.entries(CATEGORY)
    .map((item, index) => {
      return Category.create({ name: item[0], icon: item[1] })
    })
  ).then(() => {
    console.log('Category seeder is done.')
    mongoose.disconnect()
  })
})