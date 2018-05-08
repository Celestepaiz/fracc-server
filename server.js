const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const router = require('./routes/users')
const routerpostgres = require('./routes/postgres')
//configuracion passport
require('./passport/passport')

//
//mongoose.connect('mongodb://fracc:Nami.123@ds263089.mlab.com:63089/usersfracc')
mongoose.connect('mongodb://localhost/fraccionamiento')
const app = express()
//sequelize postgres
const {sequelize} = require('./models/postgres')
//sequelize mysql
app.use(morgan('combined'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use("/api",router)
app.use("/api",routerpostgres)

sequelize.authenticate()
.then(() => {
    console.log("Postgres funcionando")
})
.catch(err => {
    console.log('err')
    throw err
})


app.listen(5000)