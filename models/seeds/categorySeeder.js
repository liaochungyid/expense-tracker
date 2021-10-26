if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const mongoose = require('mongoose')
const Category = require('../categorySchema')
const db = require('../../config/mongoose')
const CATEGORY = {
  家居物業: '<i class="fas fa-home" >',
  交通出行: '<i class="fas fa-shuttle-van">',
  休閒娛樂: '<i class="fas fa-grin-beam">',
  餐飲食品: '<i class="fas fa-utensils">',
  其他: '<i class="fas fa-pen">'
}

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