const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3030
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const donasi = require('./router/donasi')
const donatur = require('./router/donatur')
const login = require('./router/login')
require('./config/auth')(passport)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(donasi)
app.use(donatur)
app.use(login)

app.listen(port, (err) => {
    if(err) console.error(err)
    else console.log('Server running on localhost:'+port)
})