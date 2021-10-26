const express = require('express')
const exphbs = require('express-handlebars')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const app = express()
const port = process.env.PORT

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}


app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {
    ifEqual: function (obj, value, trueString, falseString) {
      return ((obj === value) ? trueString : falseString)
    }
  }
}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index', { CATEGORY: Object.keys(CATEGORY) })
})

app.get('/users/create', (req, res) => {
  res.render('edit', { message: 'new page' })
})

app.get('/users/edit', (req, res) => {
  res.render('edit', { message: 'edit page' })
})

app.get('/users/login', (req, res) => {
  res.render('login')
})

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.get('/users/logout', (req, res) => {
  res.redirect('/users/login')
})
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
