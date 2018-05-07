'use strict';
module.exports = (sequelize, DataTypes) => {
    var maintenance = sequelize.define('maintenance', {
        concepto: DataTypes.STRING,
        monto: DataTypes.NUMERIC(5,2), 
        fecha_limite: DataTypes.DATE,
        id_user: DataTypes.STRING(24)
        },
        {}); maintenance.associate = function(models) {
        // associations can be defined here
      };
      return maintenance;
    };