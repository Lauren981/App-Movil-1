import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Image, Modal } from 'react-native';
import { useProductosContext } from '../context/ProductosContext';

const ProductList = () => {
  const { productos, eliminarProducto } = useProductosContext();
  const [detalle, setDetalle] = useState<any | null>(null);

  const renderItem = ({ item }: any) => (
    <View style={styles.itemRow}>
      <Text style={styles.cell}>{item.nombre}</Text>
      <Text style={styles.cell}>{item.precio}</Text>
      <Text style={styles.cell}>{item.descripcion}</Text>
      <TouchableOpacity style={styles.verBtn} onPress={() => setDetalle(item)}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Ver</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Detalle Items</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { flex: 1 }]}>Nombre</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Precio</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Descripción</Text>
        <Text style={[styles.headerCell, { flex: 0.7 }]}>Acción</Text>
      </View>
      <FlatList
        data={productos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      <Modal visible={!!detalle} animationType="slide" transparent={false}>
        {detalle && (
          <View style={styles.detalleContainer}>
            <Text style={styles.titulo}>Detalle</Text>
            <Text>Nombre: {detalle.nombre}</Text>
            <Text>Precio: {detalle.precio}</Text>
            <Text>Descripción: {detalle.descripcion}</Text>
            <Text>Estado: {detalle.estado}</Text>
            <Text>Categoría: {detalle.categoria}</Text>
            <View style={{ marginVertical: 20 }}>
              {detalle.foto ? (
                <Image source={{ uri: detalle.foto }} style={{ width: 100, height: 100 }} />
              ) : (
                <Image source={require('../../assets/icon.png')} style={{ width: 100, height: 100 }} />
              )}
            </View>
            <Button title="Eliminar" color="#d9534f" onPress={() => { eliminarProducto(detalle.id); setDetalle(null); }} />
            <Button title="Volver" onPress={() => setDetalle(null)} />
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 2,
    paddingHorizontal: 5,
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 6,
    paddingHorizontal: 5,
    backgroundColor: '#fafafa',
    borderRadius: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 6,
  },
  verBtn: {
    backgroundColor: '#43a047',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: 'center',
  },
  detalleContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ProductList;