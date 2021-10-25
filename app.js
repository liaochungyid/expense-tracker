const express = require('express')
const exphbs = require('express-handlebars')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const app = express()
const port = process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
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
