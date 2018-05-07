const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const router = require('./routes/users')
const routerpostgres = require('./routes/postgres')
const routermysql = require('./routes/mysql')
//configuracion passport
require('./passport/passport')

//
mongoose.connect('mongodb://fracc:Nami.123@ds263089.mlab.com:63089/usersfracc')
//mongoose.connect('mongodb://localhost/fraccionamiento')
const app = express()
//sequelize postgres
const {sequelize} = require('./models/postgres')
//sequelize mysql
const {sequelizeMysql} = require('./models/mysql')
app.use(morgan('combined'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use("/api",router)
app.use("/api",routerpostgres)
app.use("/api",routermysql)
//console.log(sequelizeMysql)

sequelize.authenticate()
.then(() => {
    console.log("ya jalo")
})
.catch(err => {
    console.log('err')
    throw err
})

sequelizeMysql.authenticate()
.then(() => {
    console.log('ya jalo x2')
})
.catch((err) => {
    console.log('mysql conn error')
    throw err
})

app.listen(5000)