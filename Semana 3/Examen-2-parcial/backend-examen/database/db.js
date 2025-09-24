const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('producto_examen_db', 'root', '0000', {
    host: 'localhost',
    dialect: 'mysql'
})

async function conexion() {
    try {
        await sequelize.authenticate()
        console.log('conexion a base de datos');
    } catch (error) {
        console.log('Conexion fallida a base de datos', error);
    }
}

conexion()
module.exports = sequelize