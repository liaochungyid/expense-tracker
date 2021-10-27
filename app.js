const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

require('./public/javascripts/dateFormat')
require('./config/mongoose')
const passport = require('./config/passport')

const app = express()
const port = process.env.PORT

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {
    ifEqual: function (obj, value, trueString, falseString) {
      return ((obj === value) ? trueString : falseString)
    }
  }
}))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.name = req.flash('name')
  res.locals.email = req.flash('email')
  next()
})

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

require('./routes')(app, passport)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
