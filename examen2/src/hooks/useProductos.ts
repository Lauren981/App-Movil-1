import { useEffect, useState } from 'react';
import { getProductos, createProducto, deleteProducto } from '../api/productosApi';

export function useProductos() {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const cargarProductos = async () => {
    setLoading(true);
    const data = await getProductos();
    setProductos(data);
    setLoading(false);
  };

  const agregarProducto = async (producto: any) => {
    await createProducto(producto);
    await cargarProductos();
  };

  const eliminarProducto = async (id: number) => {
    await deleteProducto(id);
    await cargarProductos();
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return {
    productos,
    loading,
    cargarProductos,
    agregarProducto,
    eliminarProducto,
  };
}