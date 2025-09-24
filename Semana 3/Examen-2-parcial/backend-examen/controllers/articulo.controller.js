const Producto = require('../models/producto.model')

const getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll()
        res.status(200).json({ data: productos })
    } catch (error) {
        console.log('Error en getProductos', error);
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

const createProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, estado, categoria, url_foto } = req.body
        await Producto.create({
            nombre,
            descripcion,
            precio,
            estado,
            categoria,
            url_foto
        })

        res.status(201).json({message: 'Exito'})
    } catch (error) {
        console.log('Error en createProducto', error);
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

const deleteProducto = async (req, res) => {
    try {
        await Producto.destroy({
            where: {id: req.params.id}
        })

        res.status(200).json({message: 'Eliminado'})
    } catch (error) {
        console.log('Error en deleteProducto', error);
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

module.exports = {
    getProductos,
    createProducto,
    deleteProducto
}