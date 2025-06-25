import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProductosContext } from '../context/ProductosContext';

const ProductForm = () => {
  const { agregarProducto } = useProductosContext();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Disponible');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [foto, setFoto] = useState<string | undefined>(undefined);

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      alert('Permiso de cámara denegado');
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const handleGuardar = async () => {
    if (!nombre || !descripcion || !categoria || !precio) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    await agregarProducto({
      nombre,
      descripcion,
      estado,
      categoria,
      precio,
      foto,
    });
    setNombre('');
    setDescripcion('');
    setEstado('Disponible');
    setCategoria('');
    setPrecio('');
    setFoto(undefined);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />
      <TextInput style={styles.input} placeholder="Estado" value={estado} onChangeText={setEstado} />
      <TextInput style={styles.input} placeholder="Categoría" value={categoria} onChangeText={setCategoria} />
      <TextInput style={styles.input} placeholder="Precio" value={precio} onChangeText={setPrecio} keyboardType="numeric" />
      <TouchableOpacity style={styles.imageContainer} onPress={tomarFoto}>
        <Image
          source={foto ? { uri: foto } : require('../../assets/icon.png')}
          style={styles.image}
        />
        <Text style={{ textAlign: 'center', marginTop: 5 }}>Fotografía Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Guardar</Text>
      </TouchableOpacity>
      {/* Botón grande verde para Detalle Items */}
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <View style={styles.detalleBtn}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Detalle Items</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  image: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#1976d2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  detalleBtn: {
    backgroundColor: '#43a047',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default ProductForm;