module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
        titulo: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        fecha_inicio: DataTypes.DATE,
        fecha_fin: DataTypes.DATE,
        hora_inicio: DataTypes.TIME,
        hora_fin: DataTypes.TIME,
        id_user: DataTypes.STRING
    })
    return Reservation
}