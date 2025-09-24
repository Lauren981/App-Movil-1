const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.INTEGER,
    },
    estado: {
        type: DataTypes.ENUM('disponible', 'no disponible'),
        defaultValue: 'disponible'
    },
    categoria: {
        type: DataTypes.STRING
    },
    url_foto: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Producto',
    timestamps: false
})

module.exports = Producto