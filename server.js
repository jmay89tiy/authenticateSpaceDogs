const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const dal = require('./dal')
const app = express()
const path = require('path');
// const people = [
//   { id: 1, name: 'Joshua May', username: 'jmay89', password: 'password' },
//   { id: 2, name: 'doggo13', username: 'doggo13', password: 'bones' }
// ]

app.use(express.static("public"));


app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', express.static(path.join(__dirname, '/public')))



//routes below
app.use(
  session({
    secret: 'dogs rule',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
  })
)
app.use(function (req, res, next) {
  if (req.session.individualUser) {
    req.isAuthenticated = true
  } else {
    req.isAuthenticated = false
  }
  console.log(req.isAuthenticated, 'session')
  next()
  // above is checking if session is true or false based on authentication
})

app.get('/', function (req, res) {
  res.render('homepage', { isAuthenticated: req.isAuthenticated })
  //if authenticated resolve to homepage '/'
})
app.get('/admin', function (req, res) {
  if (req.isAuthenticated) {
    const users = dal.getUsers()
    res.render('admin', { users: users, loggedIndividual: req.session.individualUser })
  } else {
    res.redirect('/')
  }
})

app.get('/login', function (req, res) {
  res.render('login')
})

app.post('/login', function (req, res) {
  const sesh = req.session
  const foundIndividual = dal.getIndividualByUsername(req.body.username)
  if (req.body.password === foundIndividual.password) {
    req.session.individualUser = { name: foundIndividual.name }
    res.redirect('/admin')
  } else {
    res.redirect('/login')
  }
})
// approves user when password/username syncs else, it redirects to the login page
app.get('/logout', function (req, res) {
  req.session.destroy()
  res.render('logout')
})
//destroys sessions when logging out.

app.listen(3000, function () {
  console.log('server running on port 3000')
})
// above listens on port 3000.