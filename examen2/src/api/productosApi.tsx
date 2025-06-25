const API_URL = 'http://192.168.1.10:3000/productos';

export const getProductos = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const createProducto = async (producto: any) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  return await res.json();
};

export const deleteProducto = async (id: number) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};