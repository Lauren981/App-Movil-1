import React, { createContext, useContext } from 'react';
import { useProductos } from '../hooks/useProductos';

const ProductosContext = createContext<any>(null);

export const ProductosProvider = ({ children }: { children: React.ReactNode }) => {
  const productosHook = useProductos();
  return (
    <ProductosContext.Provider value={productosHook}>
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductosContext = () => useContext(ProductosContext);