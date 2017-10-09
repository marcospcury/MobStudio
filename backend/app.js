const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const checkAuth = require('./utils/checkAuth')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')

require('./config/database')()
require('./config/passport')(passport)

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//app.use(favicon(path.join(__dirname, 'front', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../front/public')))
app.use(session({ 
  cookie: { maxAge: 60000 },
  key: process.env.MOB_SESSION_KEY,
  secret: process.env.MOB_SESSION_SECRET
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.msg_sucesso = req.flash('msg_sucesso')
  res.locals.msg_erro = req.flash('msg_erro')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

require('./routes/apiRoutes')(app)
require('./routes/appRoutes')(app)


module.exports = app
