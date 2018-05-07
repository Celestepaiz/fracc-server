const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../../config/config')
const dbmysql = {}

const sequelize = new Sequelize(
    config.dbmysql.database,
    config.dbmysql.user,
    config.dbmysql.password,
    config.dbmysql.options
)

const pmodel = fs.readdirSync(__dirname)
  .filter((file) =>
     file !== 'index.js'
)
  .forEach((file) =>{
      const model = sequelize.import(path.join(__dirname, file))
      dbmysql[model.name] = model
  })

  dbmysql.sequelizeMysql = sequelize
  dbmysql.Sequelize = Sequelize

  module.exports = dbmysql