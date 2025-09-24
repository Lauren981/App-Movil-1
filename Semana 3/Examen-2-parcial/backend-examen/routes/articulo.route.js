const express = require('express')
const router = express.Router()
const productoController = require('../controllers/producto.controller')

router.get('/productos', productoController.getProductos)
router.post('/productos', productoController.createProducto)
router.delete('/items/:id', productoController.deleteProducto)

module.exports = router