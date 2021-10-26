const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

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
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.email = req.flash('email')
  next()
})

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

require('./routes')(app)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
