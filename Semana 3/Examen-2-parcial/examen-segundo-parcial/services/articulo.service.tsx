import axios from 'axios'
const url_api: string = 'http://192.168.0.2:5000'

export const getProductos = async () => {
    const _res = await axios.get(`${url_api}/productos`)
    return _res.data.data
}

export const createProducto = async (
    nombre: string,
    descripcion: string,
    precio: number,
    estado: string,
    categoria: string,
    url_foto: string
) => {
    const _res = await axios.post(`${url_api}/productos`, {
        nombre,
        descripcion,
        precio,
        estado: estado || 'disponible',
        categoria,
        url_foto: url_foto || ''
    })

    return _res.status
}

export const deleteProducto = async (id: number) => {
    const _res = await axios.delete(`${url_api}/items/${id}`)
    return _res.status
}