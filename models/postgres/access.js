'use strict';
module.exports = (sequelize, DataTypes) => {
  var access = sequelize.define('access', {
    modelo: DataTypes.INTEGER,
    marca: DataTypes.STRING(30),
    placas: DataTypes.STRING(7),
    codigo: DataTypes.STRING(10),
    id_user: DataTypes.STRING(24)
  }, {});
  access.associate = function(models) {
    // associations can be defined here
  };
  return access;
};