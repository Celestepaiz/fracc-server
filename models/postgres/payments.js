'use strict';
module.exports = (sequelize, DataTypes) => {
    var payments = sequelize.define('payments', {
        folio: DataTypes.STRING(7),
        fecha_mant: DataTypes.DATE,
        calle: DataTypes.STRING(30),
        numero: DataTypes.INTEGER,
        concepto: DataTypes.STRING,
        monto: DataTypes.NUMERIC(5,2), 
        nombre: DataTypes.STRING(30), 
        id_user: DataTypes.STRING(24)
        },
        {}); payments.associate = function(models) {
        // associations can be defined here
      };
      return payments;
    };