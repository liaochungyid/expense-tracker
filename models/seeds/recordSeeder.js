if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const mongoose = require('mongoose')
const User = require('../userSchema')
const Record = require('../recordSchema')
const Category = require('../categorySchema')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const USER = {
  name: '廣志的私帳',
  email: 'example@example.com',
  password: '123456'
}

const RECORD = [{
  name: '小新的內褲',
  amount: 300
},
{
  name: '交通車',
  amount: 800
},
{
  name: '跟小葵去遊樂園',
  amount: 3000
},
{
  name: '美牙的生日餐',
  amount: 2000
},
{
  name: '小白新狗屋',
  amount: 200
}]

db.once('open', (err, resp) => {
  bcrypt
    .genSalt(Number(process.env.SALT_NUMBER))
    .then(salt => bcrypt.hash(USER.password, salt))
    .then(hash => {
      User
        .create(Object.assign(USER, { password: hash }))
        .then((user) => {
          return Category
            .find()
            .lean()
            .then((categories) => {
              Promise.all(categories.map(async (item, index) => {
                return await Record
                  .create(Object.assign(RECORD[index], {
                    date: Date.now(),
                    userId: user._id,
                    categoryId: item._id
                  }))
              }))
            })
        })
    })

})

setTimeout(() => mongoose.disconnect(), 10000)