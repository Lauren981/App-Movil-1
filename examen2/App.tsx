import React from 'react';
import { SafeAreaView, View } from 'react-native';
import ProductForm from './src/components/ProductForm';
import ProductList from './src/components/ProductList';
import { ProductosProvider } from './src/context/ProductosContext';

export default function App() {
  return (
    <ProductosProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ProductForm />
          <ProductList />
        </View>
      </SafeAreaView>
    </ProductosProvider>
  );
}
